import React, { useState, useEffect, useRef, useCallback } from 'react'
import { io } from 'socket.io-client'
import { Stack, Divider, Box, InputBase, Avatar, IconButton, Typography, Button } from '@mui/material'
import { SendRounded } from '@mui/icons-material'
import SpaceBox from './SpaceBox'

// 서버와 연결 => connection 진행

const socket = io(process.env.REACT_APP_API_URL, {
   withCredentials: true,
})

const peerConnection = new RTCPeerConnection()

const peers = {}

export const Chat = () => {
   const [messages, setMessages] = useState([])
   const [input, setInput] = useState('')
   const [user, setUser] = useState(null)
   const messagesContainerRef = useRef(null)

   useEffect(() => {
      socket.emit('user info', 'requestUserInfo')
      socket.on('user info', (userInfo) => {
         setUser(userInfo)
      })

      socket.on('chat message', (msg) => {
         setMessages((prevMessages) => [...prevMessages, msg])
      })

      return () => {
         socket.off('chat message')
         socket.off('user info')
      }
   }, [])

   useEffect(() => {
      if (messagesContainerRef.current) {
         messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
      }
   }, [messages])

   const sendMessage = () => {
      if (!input.trim()) return

      socket.emit('chat message', input)
      setInput('')
   }

   const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
         e.preventDefault()
         sendMessage()
      }
   }

   return (
      <>
         <Divider>
            <Typography variant="caption" color="grey">
               채팅 내용
            </Typography>
         </Divider>
         <Box
            ref={messagesContainerRef} // 메시지 컨테이너에 ref 추가
            sx={{
               height: 250,
               overflowY: 'auto',
               color: '#222',
            }}
         >
            <Stack spacing={1} m={0.5} divider={<Divider />}>
               {messages.map((msg, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'start' }}>
                     <Avatar src={msg.imgUrl && process.env.REACT_APP_API_URL + '/userImg' + msg.imgUrl} sx={{ width: 32, height: 32, mr: 1 }} />
                     <Box>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                           {msg.user}
                        </Typography>
                        <Typography variant="body2">{msg.message}</Typography>
                     </Box>
                  </Box>
               ))}
            </Stack>
         </Box>
         <Box sx={{ display: 'flex', alignItems: 'center', px: 1, py: 0.5, mt: 1, border: '1px solid #ddd', borderRadius: '5px' }}>
            <InputBase
               fullWidth
               variant="outlined"
               value={input}
               onChange={(e) => setInput(e.target.value)}
               placeholder="메시지를 입력하세요"
               onKeyDown={handleKeyDown} // 엔터키 눌렀을 때 전송
            />

            <IconButton onClick={sendMessage}>
               <SendRounded />
            </IconButton>
         </Box>
      </>
   )
}

export const Broadcaster = ({ setSpeaking }) => {
   const audioRef = useRef(null)

   useEffect(() => {
      socket.emit('broadcaster')

      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
         audioRef.current.srcObject = stream

         stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream))

         peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
               socket.emit('candidate', event.candidate)
            }
         }

         socket.on('watcher', (watcherId) => {
            peerConnection.createOffer().then((offer) => {
               peerConnection.setLocalDescription(offer)
               socket.emit('offer', offer, watcherId)
            })
         })

         socket.on('answer', (answer) => {
            peerConnection.setRemoteDescription(new RTCSessionDescription(answer))
         })

         socket.on('candidate', (candidate) => {
            peerConnection.addIceCandidate(new RTCIceCandidate(candidate))
         })

         socket.on('watcherDisconnected', (watcherId) => {
            console.log(`청취자 ${watcherId} 연결 해제됨`)
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
            setSpeaking(average)
            requestAnimationFrame(checkVolume)
         }

         checkVolume()
      })

      return () => {
         peerConnection.close()
         socket.disconnect()
      }
   }, [])

   return <audio ref={audioRef} autoPlay />
}

export const Watcher = ({ setSpeaking }) => {
   const audioRef = useRef(null)

   useEffect(() => {
      socket.emit('watcher')

      socket.on('offer', (offer, broadcasterId) => {
         const peerConnection = new RTCPeerConnection()
         peers[broadcasterId] = peerConnection

         peerConnection
            .setRemoteDescription(new RTCSessionDescription(offer))
            .then(() => peerConnection.createAnswer())
            .then((answer) => {
               peerConnection.setLocalDescription(answer)
               socket.emit('answer', answer, broadcasterId)
            })

         peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
               socket.emit('candidate', event.candidate, broadcasterId)
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
               setSpeaking(average)
               requestAnimationFrame(checkVolume)
            }

            checkVolume()
         }
      })

      socket.on('candidate', (candidate, broadcasterId) => {
         if (peers[broadcasterId]) {
            peers[broadcasterId].addIceCandidate(new RTCIceCandidate(candidate))
         }
      })

      socket.on('broadcasterDisconnected', (broadcasterId) => {
         if (peers[broadcasterId]) {
            peers[broadcasterId].close()
            delete peers[broadcasterId]
         }
      })

      return () => {
         Object.values(peers).forEach((peer) => peer.close())
         socket.emit('watcherDisconnected')
         socket.off('offer')
         socket.off('candidate')
         socket.off('broadcasterDisconnected')
         socket.disconnect()
      }
   }, [])

   return (
      <>
         <audio ref={audioRef} autoPlay />
      </>
   )
}
