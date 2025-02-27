import { Box, Typography, Avatar, Stack, Slider, Grid2 } from '@mui/material'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { LoadingBox, Main } from '../../../styles/BaseStyles'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'
import { Chat, Broadcaster, Watcher } from './SpaceItems'

function SpaceBox({}) {
   const { user, loading, error } = useSelector((state) => state.auth.user)
   const [volume, setVolume] = useState(50)
   const [speaking, setSpeaking] = useState(1)

   if (loading) return <LoadingBox />

   const imageUrl = user?.imgUrl ? process.env.REACT_APP_API_URL + 'userImg' + user.imgUrl : '/default_profile.png'

   return (
      <Main>
         <Grid2 container display="flex">
            <Grid2 size={{ md: 4, sm: 5, xs: 12 }} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <Stack spacing={2} direction={{ sm: 'column', xs: 'row' }} alignItems="center">
                  <Box
                     sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: { sm: 180, xs: 140 },
                        height: { sm: 180, xs: 140 },
                     }}
                  >
                     <Box
                        sx={{
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'center',
                           borderRadius: '50%',
                           background: `linear-gradient(${speaking}deg, #4ACBCF, #A57EFF)`,
                           p: speaking > 20 ? 2 : 1.1,
                           transition: '0.2s',
                        }}
                     >
                        <Avatar
                           src={imageUrl}
                           alt={user?.name}
                           sx={{
                              width: { sm: 120, xs: 100 },
                              height: { sm: 120, xs: 100 },
                              backgroundColor: 'white',
                              border: '5px solid white',
                           }}
                        />
                     </Box>
                  </Box>
                  <Broadcaster setSpeaking={setSpeaking} />
                  <Watcher setSpeaking={setSpeaking} />
                  <Stack alignItems={{ sm: 'center', xs: 'start' }}>
                     <Stack alignItems="center" spacing={1} direction={{ sm: 'column', xs: 'row' }}>
                        <Typography variant="body2" color="textSecondary">
                           진행자
                        </Typography>
                        <Typography variant="h6">{user?.name || '이름 없음'}</Typography>
                     </Stack>
                     <Stack alignItems="center">
                        <Box sx={{ display: 'flex', alignItems: 'center', width: { md: 170, sm: 150, xs: 130 }, mt: 1 }}>
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
                        <Typography variant="body2" color="textSecondary" sx={{ display: { sm: 'block', xs: 'none' } }}>
                           볼륨: {volume}%
                        </Typography>
                     </Stack>
                  </Stack>
               </Stack>
            </Grid2>
            <Grid2 p={2} size={{ md: 8, sm: 7, xs: 12 }}>
               <Chat />
            </Grid2>
         </Grid2>
      </Main>
   )
}

export default SpaceBox
