import { useState, useEffect, useRef, useCallback } from 'react'
import { Stack, Divider, Box, InputBase, Avatar, IconButton, Typography } from '@mui/material'
import { SendRounded } from '@mui/icons-material'

function SpaceChat({ socket, studioId }) {
   const [messages, setMessages] = useState([])
   const [input, setInput] = useState('')
   const messagesContainerRef = useRef(null)

   useEffect(() => {
      if (!socket) return
      socket.on('send message', (msg) => {
         setMessages((prevMessages) => [...prevMessages, msg])
      })

      return () => {
         socket.off('chat message')
         socket.off('send message')
      }
   }, [socket])

   useEffect(() => {
      if (messages.length > 0 && messagesContainerRef.current) {
         messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
      }
   }, [messages])

   const sendMessage = useCallback(() => {
      if (!input.trim()) return
      socket.emit('chat message', input, studioId)
      setInput('')
   }, [socket, studioId, input])

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
            ref={messagesContainerRef}
            sx={{
               height: 250,
               overflowY: 'auto',
               color: '#222',
            }}
         >
            <Stack spacing={1} m={0.5} divider={<Divider />}>
               {messages.length > 0 &&
                  messages.map((msg, index) => (
                     <Box key={index} sx={{ display: 'flex', alignItems: 'start' }}>
                        <Avatar src={msg.imgUrl && process.env.REACT_APP_API_URL + '/userImg' + msg.imgUrl} sx={{ width: 32, height: 32, mr: 1 }} />
                        <Box>
                           <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                              {msg.name}
                           </Typography>
                           <Typography variant="body2">{msg.message}</Typography>
                        </Box>
                     </Box>
                  ))}
            </Stack>
         </Box>
         <Box sx={{ display: 'flex', alignItems: 'center', px: 1, py: 0.5, mt: 1, border: '1px solid #ddd', borderRadius: '5px' }}>
            <InputBase fullWidth variant="outlined" value={input} onChange={(e) => setInput(e.target.value)} placeholder="메시지를 입력하세요" onKeyDown={handleKeyDown} />

            <IconButton onClick={sendMessage}>
               <SendRounded />
            </IconButton>
         </Box>
      </>
   )
}

export default SpaceChat
