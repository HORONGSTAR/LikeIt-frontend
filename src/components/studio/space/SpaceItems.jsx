import { useState, useEffect, useRef, useCallback } from 'react'
import useSocket from '../../../hooks/useSocket'
import { Button, Slider, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { SendRounded } from '@mui/icons-material'
import { Mic, VolumeUp, VolumeOff } from '@mui/icons-material'

const peerConnection = new RTCPeerConnection()
const peers = {}

export const SpaceStartButton = ({ studioId, setStart }) => {
   const socket = useSocket()
   const [open, setOpen] = useState(false)
   const startSpace = useCallback(() => {
      if (studioId) {
         socket.emit('start space', studioId)
         setStart(true)
         setOpen(false)
      }

      return () => {
         socket.off('start space', studioId)
      }
   }, [socket, setStart, studioId])

   return (
      <>
         {open && (
            <Dialog open={open}>
               <DialogTitle>음성 스페이스 시작</DialogTitle>
               <DialogContent>
                  <img src="/images/space.png" width="300" alt="스페이스를 통한 교류" />
                  <DialogContentText>스페이스를 통해 스튜디오 구독자들과 소통할까요?</DialogContentText>
               </DialogContent>
               <DialogActions>
                  <Button color="orenge" disabled={!socket} onClick={startSpace}>
                     확인
                  </Button>
                  <Button onClick={() => setOpen(false)}>취소</Button>
               </DialogActions>
            </Dialog>
         )}
         <Button
            sx={{
               background: 'linear-gradient(to right, #4ACBCF, #A57EFF)',
               color: '#fff',
               p: 1,
            }}
            onClick={() => setOpen(true)}
         >
            <Mic sx={{ fontSize: '20px' }} /> 스페이스
         </Button>
      </>
   )
}

export const AdminAudio = ({ close, studioId }) => {
   const socket = useSocket()
   const audioRef = useRef(null)
   const [volume, setVolume] = useState(0)
   const [speaking, setIsSpeaking] = useState(false)

   useEffect(() => {
      if (!socket) return

      navigator.mediaDevices
         .getUserMedia({ audio: true })
         .then((stream) => {
            audioRef.current.srcObject = stream
            stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream))

            peerConnection.onicecandidate = (event) => {
               if (event.candidate) socket.emit('candidate', event.candidate, studioId)
            }
            peerConnection.createOffer().then((offer) => {
               peerConnection.setLocalDescription(offer)
               socket.emit('offer', offer, studioId)
            })

            socket.on('answer', (answer) => {
               peerConnection.setRemoteDescription(new RTCSessionDescription(answer))
            })

            socket.on('candidate', (candidate) => {
               peerConnection.addIceCandidate(new RTCIceCandidate(candidate))
            })

            const audioContext = new AudioContext()
            const analyser = audioContext.createAnalyser()
            const microphone = audioContext.createMediaStreamSource(stream)
            microphone.connect(analyser)
            analyser.fftSize = 256

            const bufferLength = analyser.frequencyBinCount
            const dataArray = new Uint8Array(bufferLength)

            const checkVolume = () => {
               analyser.getByteFrequencyData(dataArray)
               let sum = dataArray.reduce((a, b) => a + b, 0)
               let average = sum / bufferLength
               setVolume(average)
               setIsSpeaking(average > 20)
               requestAnimationFrame(checkVolume)
            }

            checkVolume()
         })
         .catch((err) => console.log(err))

      return () => {
         socket.off('candidate')
         socket.off('offer')
         socket.off('answer')
      }
   }, [socket, studioId])

   useEffect(() => {
      if (close) {
         peerConnection.close()
      }
   }, [close])

   return <audio ref={audioRef} autoPlay controls />
}

export const UserAudio = ({ studioId }) => {
   const socket = useSocket()
   const audioRef = useRef(null)
   const [volume, setVolume] = useState(0)

   useEffect(() => {
      if (!socket) return
      socket.on('offer', (offer, studioId, adminId) => {
         const peerConnection = new RTCPeerConnection()
         peers[adminId] = peerConnection

         peerConnection
            .setRemoteDescription(new RTCSessionDescription(offer))
            .then(() => peerConnection.createAnswer())
            .then((answer) => {
               peerConnection.setLocalDescription(answer)
               socket.emit('answer', answer, adminId)
            })

         peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
               socket.emit('candidate', event.candidate, studioId)
            }
         }

         peerConnection.ontrack = (event) => {
            const stream = event.streams[0]
            if (audioRef.current) {
               audioRef.current.srcObject = stream
            }

            const audioContext = new AudioContext()
            const analyser = audioContext.createAnalyser()
            const source = audioContext.createMediaStreamSource(stream)
            source.connect(analyser)
            analyser.fftSize = 256
            const bufferLength = analyser.frequencyBinCount
            const dataArray = new Uint8Array(bufferLength)

            const checkVolume = () => {
               analyser.getByteFrequencyData(dataArray)
               let sum = dataArray.reduce((a, b) => a + b, 0)
               let average = sum / bufferLength
               setVolume(average)
               requestAnimationFrame(checkVolume)
            }

            checkVolume()
         }
      })

      socket.on('candidate', (candidate, adminId) => {
         if (peers[adminId]) {
            peers[adminId].addIceCandidate(new RTCIceCandidate(candidate))
         }
      })

      return () => {
         Object.values(peers).forEach((peer) => peer.close())
         socket.off('offer')
         socket.off('candidate')
         socket.off('answer')
      }
   }, [socket])

   return <audio ref={audioRef} autoPlay controls />
}
