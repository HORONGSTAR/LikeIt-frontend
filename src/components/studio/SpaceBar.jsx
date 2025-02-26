import { Box, Typography, Avatar, AvatarGroup, Grid2, Chip, Stack } from '@mui/material'
import { Stack2 } from '../../styles/BaseStyles'
import SpaceBox from './SpaceBox'
import { useState, useEffect, useRef } from 'react'
import MicIcon from '@mui/icons-material/Mic'
import { flexbox, height, maxWidth, minHeight, minWidth, width } from '@mui/system'

function SpaceBar({ studio }) {
   const boxRef = useRef(null)
   const [width, setWidth] = useState(0)
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

   const users = [
      { id: 1, nick: 'test', src: 'test' },
      { id: 2, nick: 'test', src: 'test' },
      { id: 3, nick: 'test', src: 'test' },
      { id: 4, nick: 'test', src: 'test' },
      { id: 5, nick: 'test', src: 'test' },
   ]

   const [open, setOpne] = useState(false)

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
                        {open ? '2025년 1월 30일 13시 10분 라이브 시작' : '정소희님이 진행 중'}
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
                              {users.map((user) => (
                                 <Avatar key={user?.id} alt={user?.name} src={user?.img} />
                              ))}
                           </AvatarGroup>
                           <Typography fontWeight={600}>청취 참여하기</Typography>
                        </Stack2>
                     }
                     onClick={() => setOpne(!open)}
                  />
               )}
            </Stack2>
         </Stack2>
         {open && <SpaceBox />}
      </Stack>
   )
}

export default SpaceBar
