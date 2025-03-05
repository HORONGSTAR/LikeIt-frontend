import { useState, useEffect, useRef } from 'react'
import { SpaceScreen } from './SpaceAnimation'
import { ErrorBox } from '../../../styles/BaseStyles'

export const Broadcaster = ({ socket, info }) => {
   const [stream, setStream] = useState(null)
   const [open, setOpen] = useState(false)
   const localStream = useRef(null)
   const peerConnections = useRef({})
   const studioId = info.studioId

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

               const peer = new RTCPeerConnection({
                  iceServers: [
                     {
                        urls: 'stun:stun.l.google.com:19302',
                     },
                  ],
               })
               peerConnections.current[listenerId] = peer

               stream.getTracks().forEach((track) => {
                  peer.addTrack(track, stream)
               })

               peer
                  .createOffer()
                  .then((offer) => {
                     peer.setLocalDescription(offer)
                     socket.emit('offer', { offer, listenerId })
                  })
                  .catch(() => setOpen(true))

               peer.onicecandidate = (event) => {
                  if (event.candidate) socket.emit('ice-candidate', { sand: '방송자', targetId: listenerId, candidate: event.candidate })
               }
            })

            socket.on('answer', ({ answer, listenerId }) => {
               if (peerConnections.current[listenerId]) {
                  const peer = peerConnections.current[listenerId]
                  if (peer.signalingState === 'stable') return

                  peer.setRemoteDescription(new RTCSessionDescription(answer)).catch(() => setOpen(true))
               }
            })

            socket.on('ice-candidate', ({ candidate, listenerId }) => {
               if (peerConnections.current[listenerId]) {
                  peerConnections.current[listenerId].addIceCandidate(new RTCIceCandidate(candidate))
               }
            })
         })
         .catch(() => setOpen(true))

      const peerConnectionsCurrent = peerConnections.current

      return () => {
         localStream.current?.getTracks().forEach((track) => track.stop())
         Object.values(peerConnectionsCurrent).forEach((peer) => peer.close())
      }
   }, [socket, studioId, setStream])

   return (
      <>
         <SpaceScreen stream={stream} info={info} />
         <ErrorBox open={open} setOpen={setOpen} error={'스페이스 중 문제가 발생했습니다.'} />
      </>
   )
}

export const Listener = ({ socket, info }) => {
   const [stream, setStream] = useState(null)
   const audioRef = useRef(null)
   const peerConnection = useRef(null)
   const studioId = info.studioId
   const [open, setOpen] = useState(false)

   useEffect(() => {
      if (!socket) return

      socket.on('offer', ({ offer, broadcasterId }) => {
         if (peerConnection.current) {
            peerConnection.current.close()
            peerConnection.current = null
         }
         peerConnection.current = new RTCPeerConnection({
            iceServers: [
               {
                  urls: 'stun:stun.l.google.com:19302',
               },
            ],
         })
         peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer))

         peerConnection.current.createAnswer().then((answer) => {
            peerConnection.current.setLocalDescription(answer)
            socket.emit('answer', { answer, broadcasterId })
         })

         peerConnection.current.onicecandidate = (event) => {
            if (event.candidate) {
               socket.emit('ice-candidate', { sand: '청취자', targetId: broadcasterId, candidate: event.candidate })
               peerConnection.current.addIceCandidate(new RTCIceCandidate(event.candidate))
            }
         }

         socket.on('ice-candidate', ({ candidate }) => {
            peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate)).catch(() => setOpen(true))
         })

         peerConnection.current.ontrack = (event) => {
            const stream = event.streams[0]
            if (!audioRef.current) {
               setOpen(true)
               setTimeout(() => {
                  if (audioRef.current) {
                     audioRef.current.srcObject = stream
                     audioRef.current.play()
                  }
               }, 500)
               return
            }
            setStream(stream)
            audioRef.current.srcObject = stream
            audioRef.current.play()
         }
      })

      socket.on('end space', (msg) => {
         if (msg) peerConnection.current?.close()
      })

      return () => {
         peerConnection.current?.close()
      }
   }, [socket, studioId])

   return (
      <>
         <SpaceScreen stream={stream} info={info} />
         <audio ref={audioRef} />
         <ErrorBox open={open} setOpen={setOpen} error={'스페이스 중 문제가 발생했습니다.'} />
      </>
   )
}
