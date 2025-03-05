import { useState, useEffect, useRef } from 'react'
import { SpaceScreen } from './SpaceAnimation'
import { ErrorBox } from '../../../styles/BaseStyles'

export const Broadcaster = ({ setStart, socket, info }) => {
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

            socket.on('new listener', ({ listenerId }) => {
               if (peerConnections.current && peerConnections.current[listenerId]) {
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
                  .catch((err) => {
                     setOpen(true)
                     console.error(err)
                  })

               peer.onicecandidate = (event) => {
                  if (event.candidate) socket.emit('ice-candidate', { targetId: listenerId, candidate: event.candidate })
               }
            })

            socket.on('answer', ({ answer, listenerId }) => {
               if (peerConnections.current[listenerId]) {
                  const peer = peerConnections.current[listenerId]

                  if (peer.signalingState !== 'stable') {
                     peer.setRemoteDescription(new RTCSessionDescription(answer)).catch((err) => {
                        setOpen(true)
                        console.error(err)
                     })
                  }
               }
            })

            socket.on('ice-candidate', ({ candidate, listenerId }) => {
               if (peerConnections.current[listenerId]) {
                  peerConnections.current[listenerId].addIceCandidate(new RTCIceCandidate(candidate))
               }
            })
         })
         .catch((err) => {
            setOpen(true)
            console.error(err)
         })

      socket.on('end space', (msg) => {
         if (msg) {
            localStream.current?.getTracks().forEach((track) => track.stop())
            peerConnections.current && Object.values(peerConnections.current).forEach((peer) => peer.close())
            peerConnections.current = null
         }
      })

      socket.on('leave listener', ({ listenerId }) => {
         if (peerConnections.current[listenerId]) {
            peerConnections.current[listenerId].close()
            delete peerConnections.current[listenerId]
         }
      })

      return () => {
         setStart(false)
         socket.off('new listener')
         socket.off('end space')
         socket.off('ice-candidate')
         socket.off('answer')
         socket.off('offer')
         socket.off('leave space')
      }
   }, [socket, studioId, peerConnections, localStream, setStream, setStart])

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
               socket.emit('ice-candidate', { targetId: broadcasterId, candidate: event.candidate })
               peerConnection.current.addIceCandidate(new RTCIceCandidate(event.candidate))
            }
         }

         socket.on('ice-candidate', ({ candidate }) => {
            peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate)).catch(() => setOpen(true))
         })

         peerConnection.current.ontrack = (event) => {
            const stream = event.streams[0]
            if (!audioRef.current) return setOpen(true)
            setStream(stream)
            audioRef.current.srcObject = stream
            audioRef.current.play()
         }
      })

      socket.on('leave space', (msg) => {
         if (msg) {
            peerConnection.current.close()
            peerConnection.current = null
         }
      })

      socket.on('end space', (msg) => {
         if (msg) {
            peerConnection.current = null
         }
      })

      return () => {
         socket.off('offer')
         socket.off('ice-candidate')
         socket.off('leave space')
      }
   }, [socket, studioId, audioRef, peerConnection])

   return (
      <>
         <SpaceScreen stream={stream} info={info} />
         <audio ref={audioRef} />
         <ErrorBox open={open} setOpen={setOpen} error={'스페이스 중 문제가 발생했습니다.'} />
      </>
   )
}
