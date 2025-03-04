import { useState, useEffect, useRef } from 'react'
import { Slider, Typography, Stack } from '@mui/material'
import { VolumeUp, VolumeOff } from '@mui/icons-material'
import { Stack2 } from '../../../styles/BaseStyles'

export const Broadcaster = ({ socket, studioId, setStream }) => {
   const [volume, setVolume] = useState(50)
   const localStream = useRef(null)
   const peerConnections = useRef({})

   useEffect(() => {
      if (!socket) return

      navigator.mediaDevices
         .getUserMedia({ audio: true })
         .then((stream) => {
            localStream.current = stream
            setStream(stream)

            socket.on('new listener', (listenerId) => {
               if (peerConnections.current[listenerId]) {
                  peerConnections.current[listenerId].close()
                  delete peerConnections.current[listenerId]
               }

               const peer = new RTCPeerConnection()
               peerConnections.current[listenerId] = peer

               stream.getTracks().forEach((track) => {
                  peer.addTrack(track, stream)
               })

               peer
                  .createOffer()
                  .then((offer) => {
                     peer.setLocalDescription(offer)
                     socket.emit('offer', { studioId, offer, listenerId })
                  })
                  .catch((err) => console.error(err))

               peer.onicecandidate = (event) => {
                  if (event.candidate) {
                     socket.emit('ice candidate', { targetId: listenerId, candidate: event.candidate })
                  }
               }
            })

            socket.on('answer', ({ answer, listenerId }) => {
               if (peerConnections.current[listenerId]) {
                  const peer = peerConnections.current[listenerId]
                  if (peer.signalingState === 'stable') return

                  peer
                     .setRemoteDescription(new RTCSessionDescription(answer))
                     .then(() => console.log('잘됨'))
                     .catch((err) => console.error(err))
               }
            })
         })
         .catch((err) => console.error(err))

      const peerConnectionsCurrent = peerConnections.current

      return () => {
         localStream.current?.getTracks().forEach((track) => track.stop())
         Object.values(peerConnectionsCurrent).forEach((peer) => peer.close())
      }
   }, [socket, studioId, setStream])

   return (
      <Stack>
         <Stack2 sx={{ width: { md: 170, sm: 150, xs: 130 }, mt: 1 }}>
            {volume === 0 ? <VolumeOff sx={{ fontSize: 32, mr: 1, color: '#666' }} /> : <VolumeUp sx={{ fontSize: 32, mr: 1, color: '#666' }} />}
            <Slider
               value={volume}
               onChange={(e, newValue) => setVolume(newValue)}
               aria-labelledby="volume-slider"
               min={0}
               max={100}
               sx={{
                  color: '#666',
                  '& .MuiSlider-thumb': { backgroundColor: '#666' },
                  '& .MuiSlider-track': { backgroundColor: '#666' },
               }}
            />
         </Stack2>
         <Typography variant="body2" color="textSecondary" sx={{ display: { sm: 'block', xs: 'none' } }}>
            볼륨: {volume}%
         </Typography>
         <audio />
      </Stack>
   )
}

export const Listener = ({ studioId, socket, setStream }) => {
   const [volume, setVolume] = useState(50)
   const audioRef = useRef(null)
   const peerConnection = useRef(null)

   useEffect(() => {
      if (!socket) return

      socket.on('offer', ({ offer, broadcasterId }) => {
         if (peerConnection.current) {
            peerConnection.current.close()
            peerConnection.current = null
         }
         peerConnection.current = new RTCPeerConnection()
         peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer))

         peerConnection.current.createAnswer().then((answer) => {
            peerConnection.current.setLocalDescription(answer)
            socket.emit('answer', { studioId, answer, broadcasterId })
         })

         peerConnection.current.onicecandidate = (event) => {
            if (event.candidate) {
               socket.emit('ice-candidate', { targetId: broadcasterId, candidate: event.candidate })
               peerConnection.current.addIceCandidate(new RTCIceCandidate(event.candidate))
            }
         }

         peerConnection.current.ontrack = (event) => {
            const stream = event.streams[0]

            if (!audioRef.current) {
               console.error('audioRef.current is null!')
               return
            }

            audioRef.current.srcObject = stream

            audioRef.current.play()
            setStream(stream)
         }
      })

      return () => {
         peerConnection.current?.close()
      }
   }, [socket, studioId, setStream])

   useEffect(() => {
      if (audioRef.current) {
         audioRef.current.play()
         console.log('잘됨')
      }
   }, [audioRef])

   return (
      <Stack>
         <Stack2 sx={{ width: { md: 170, sm: 150, xs: 130 }, mt: 1 }}>
            {volume === 0 ? <VolumeOff sx={{ fontSize: 32, mr: 1, color: '#666' }} /> : <VolumeUp sx={{ fontSize: 32, mr: 1, color: '#666' }} />}
            <Slider
               value={volume}
               onChange={(e, newValue) => setVolume(newValue)}
               aria-labelledby="volume-slider"
               min={0}
               max={100}
               sx={{
                  color: '#666',
                  '& .MuiSlider-thumb': { backgroundColor: '#666' },
                  '& .MuiSlider-track': { backgroundColor: '#666' },
               }}
            />
         </Stack2>
         <audio ref={audioRef} />
         <Typography variant="body2" color="textSecondary" sx={{ display: { sm: 'block', xs: 'none' } }}>
            볼륨: {volume}%
         </Typography>
      </Stack>
   )
}
