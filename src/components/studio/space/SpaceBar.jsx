import { Box, Typography, Avatar, AvatarGroup, Chip, Stack, Grid2, Slider } from '@mui/material'
import { Stack2, Main } from '../../../styles/BaseStyles'
import { useState, useEffect, useRef } from 'react'
import MicIcon from '@mui/icons-material/Mic'
import { flexbox } from '@mui/system'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'
import { Chat, Broadcaster, Watcher } from './SpaceItems'
import dayjs from 'dayjs'

function SpaceBar({ studio, spaceInfo }) {
   const boxRef = useRef(null)
   const [width, setWidth] = useState(0)
   const [users, setUsers] = useState([])
   const [open, setOpne] = useState(false)
   const [volume, setVolume] = useState(50)
   const [speaking, setSpeaking] = useState(1)

   const info = {
      name: spaceInfo?.admin?.name || '이름 없음',
      imgUrl: spaceInfo?.admin?.imgUrl ? process.env.REACT_APP_API_URL + '/userImg' + spaceInfo.admin.imgUrl : '/default_profile.png',
      startTime: dayjs(spaceInfo?.admin?.startTime).format('YYYY년 MM월 DD일 HH시 mm분'),
   }

   useEffect(() => {
      const observer = new ResizeObserver((entries) => {
         if (entries[0]) {
            setWidth(entries[0].contentRect.width)
         }
      })

      if (boxRef.current) {
         observer.observe(boxRef.current)
      }

      return () => observer.disconnect()
   }, [])

   return (
      <Stack
         sx={{
            boxSizing: 'border-box',
            p: 1,
            background: 'linear-gradient(to right, #4ACBCF, #A57EFF)',
            borderRadius: open ? '30px 30px 10px 10px' : '30px',
            color: '#fff',
         }}
      >
         <Stack2
            sx={{
               display: 'flex',
               alignItems: 'center',
               height: 50,
               justifyContent: 'space-between',
            }}
         >
            <Stack2 ref={boxRef} sx={{ width: '100%', overflow: 'hidden', px: 1 }}>
               <MicIcon />
               <Stack direction={{ md: 'row', sm: 'column', xs: 'column' }} sx={{ overflow: 'hidden', width: '100%' }}>
                  <Stack2>
                     <Typography className={studio.name.length * 16 + 88 > width && 'spacebar-title'} fontSize={16} fontWeight={500}>
                        {studio.name}의 스페이스&nbsp;&nbsp;&nbsp;&nbsp;
                        <Typography className={studio.name.length * 16 + 88 > width || 'spacebar-title-copy'} component="span" sx={{ position: 'absolute' }} fontSize={16} fontWeight={500}>
                           {studio.name}의 스페이스&nbsp;&nbsp;&nbsp;&nbsp;
                        </Typography>
                     </Typography>
                  </Stack2>
                  <Stack2>
                     <Box sx={{ display: { md: 'block', sm: 'none', xs: 'none' }, height: '1px', background: '#fff', width: '20px', mr: 2 }} />
                     <Typography noWrap variant="body2">
                        {open ? info.startTime + ' · 라이브 시작' : info.name + '님이 진행 중'}
                     </Typography>
                  </Stack2>
               </Stack>
            </Stack2>
            <Stack2>
               {open ? (
                  <Chip
                     sx={{
                        background: '#fff',
                        color: '#A57EFF',
                        border: '1px solid #fff',
                        '&:hover': { background: 'none', color: '#fff' },
                     }}
                     label={'나가기'}
                     onClick={() => setOpne(!open)}
                  />
               ) : (
                  <Chip
                     sx={{
                        borderRadius: 7,
                        height: 50,
                        background: '#fff',
                        color: '#A57EFF',
                        border: '2px solid #fff',
                        '&:hover': { background: 'none', color: '#fff' },
                     }}
                     label={
                        <Stack2 spacing={{ sm: 1, xs: 0 }} sx={{ flexbox, alignItems: 'center' }}>
                           <AvatarGroup sx={{ display: { sm: 'flex', xs: 'none' } }} max={4}>
                              {users.length > 0 && users.map((user) => <Avatar key={user?.id} alt={user?.name} src={user?.img} />)}
                           </AvatarGroup>
                           <Typography fontWeight={600}>청취 참여하기</Typography>
                        </Stack2>
                     }
                     onClick={() => setOpne(!open)}
                  />
               )}
            </Stack2>
         </Stack2>
         {open && (
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
                                 src={info.imgUrl}
                                 alt={info.name}
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
                              <Typography variant="h6">{info.name}</Typography>
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
                     <Chat studioId={studio?.id} />
                  </Grid2>
               </Grid2>
            </Main>
         )}
      </Stack>
   )
}

export default SpaceBar
