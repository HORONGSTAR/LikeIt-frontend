import { useState, useEffect, useRef, useCallback } from 'react'
import { Stack } from '@mui/material'
import { SpaceScreen } from './SpaceAnimation'

export const Broadcaster = ({ socket, studioId, setStream }) => {
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
               console.log('socket')
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

                  peer.setRemoteDescription(new RTCSessionDescription(answer)).catch((err) => console.error(err))
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

   return <></>
}

export const Listener = ({ studioId, socket, setStream }) => {
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
            audioRef.current.srcObject = stream
            setStream(stream)
         }
      })

      return () => {
         peerConnection.current?.close()
      }
   }, [socket, studioId, setStream])

   if (audioRef.current) {
      audioRef.current.play()
      console.log('???')
   }
   return <audio ref={audioRef} autoPlay controls />
}
