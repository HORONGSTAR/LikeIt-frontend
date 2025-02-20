import { Box, Typography, Avatar, Stack, Slider, TextField, Button, Paper, Divider } from '@mui/material'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { LoadingBox } from '../../styles/BaseStyles'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'
import SendIcon from '@mui/icons-material/Send'

function SpaceBox() {
   const user = useSelector((state) => state.auth.user)
   const [volume, setVolume] = useState(50)
   const [message, setMessage] = useState('')
   const [chat, setChat] = useState([
      { name: '도레미', text: '안녕하세요' },
      { name: '딩동댕동', text: '소셜팀 점심은 드셨어요?' },
      { name: 'VAN', text: '라이브는 오랜만이에요.' },
   ])

   if (!user) return <LoadingBox />

   const imageUrl = user?.imgUrl ? `${process.env.REACT_APP_API_URL}/userImg/${user.imgUrl}` : '/default_profile.png'

   // 메시지 전송 핸들러
   const handleSendMessage = () => {
      if (message.trim() !== '') {
         setChat([...chat, { name: user?.name || '익명', text: message, imgUrl: imageUrl }])
         setMessage('')
      }
   }

   return (
      <Box
         sx={{
            maxWidth: '100%',
            p: 3,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            textAlign: 'left',
            gap: 3,
         }}
      >
         {/* 진행자 정보 */}
         <Stack alignItems="center">
            <Box
               sx={{
                  width: 170,
                  height: 170,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  background: 'linear-gradient(to right, #4ACBCF, #A57EFF)',
                  padding: '5px',
               }}
            >
               <Avatar
                  src={imageUrl}
                  alt={user?.name}
                  sx={{
                     width: 150,
                     height: 150,
                     backgroundColor: 'white',
                     border: '5px solid white',
                  }}
               />
            </Box>

            <Typography variant="body2" color="textSecondary" mt={1}>
               진행자
            </Typography>
            <Typography variant="h6">{user?.name || '이름 없음'}</Typography>

            {/* 볼륨 조절 */}
            <Box sx={{ display: 'flex', alignItems: 'center', width: 200, mt: 1 }}>
               {volume === 0 ? <VolumeOffIcon sx={{ fontSize: 32, mr: 1, color: '#666' }} /> : <VolumeUpIcon sx={{ fontSize: 32, mr: 1, color: '#666' }} />}
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
            </Box>
            <Typography variant="body2" color="textSecondary">
               볼륨: {volume}%
            </Typography>
         </Stack>

         {/* 채팅창 */}
         <Paper
            sx={{
               flex: 1,
               maxWidth: 600,
               borderRadius: 3,
               padding: 2,
               color: 'white',
               boxShadow: 'none',
            }}
         >
            <Box
               sx={{
                  backgroundColor: 'white',
                  borderRadius: 2,
                  p: 2,
                  height: 250,
                  overflowY: 'auto',
                  color: '#222',
               }}
            >
               <Stack spacing={1} divider={<Divider sx={{ backgroundColor: '#ddd' }} />}>
                  {chat.map((msg, index) => (
                     <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar src={msg.imgUrl} sx={{ width: 30, height: 30, mr: 1 }}>
                           {msg.name.charAt(0)}
                        </Avatar>
                        <Box>
                           <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                              {msg.name}
                           </Typography>
                           <Typography variant="body2">{msg.text}</Typography>
                        </Box>
                     </Box>
                  ))}
               </Stack>
            </Box>

            {/* 입력 필드 */}
            <Box sx={{ display: 'flex', alignItems: 'center', m: 2, border: '1px solid #ddd', borderRadius: '5px' }}>
               <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={message}
                  color="#ddd"
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  sx={{
                     backgroundColor: 'white',
                     borderRadius: 1,
                     '& .MuiOutlinedInput-root': {
                        '& fieldset': { border: 'none' },
                     },
                  }}
                  placeholder="채팅 입력하기..."
               />
               <Button onClick={handleSendMessage} variant="outlined" sx={{ ml: 1 }}>
                  <SendIcon />
               </Button>
            </Box>
         </Paper>
      </Box>
   )
}

export default SpaceBox
