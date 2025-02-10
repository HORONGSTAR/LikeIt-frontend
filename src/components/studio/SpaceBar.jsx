import { Box, Typography, Avatar, AvatarGroup, Divider, Chip } from '@mui/material'
import { Stack2 } from '../../styles/BaseStyles'
import SpaceBox from './SpaceBox'
import { useState } from 'react'

function SpaceBar({ studio }) {
   const users = [
      { nick: 'test', src: 'test' },
      { nick: 'test', src: 'test' },
      { nick: 'test', src: 'test' },
      { nick: 'test', src: 'test' },
   ]

   const [open, setOpne] = useState(false)

   return (
      <Box
         sx={{
            boxSizing: 'border-box',
            px: 1,
            maxWidth: '900px',
            background: 'linear-gradient(to right, #4ACBCF, #A57EFF)',
            borderRadius: 30,
            height: 60,
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            color: '#fff',
         }}
      >
         <Typography>가트발레단의 스페이스</Typography>
         <Box
            sx={{
               height: '1px',
               background: '#fff',
               minWidth: 10,
            }}
         />

         {open ? (
            <>
               <Typography>2025년 1월 30일 13시 10분 라이브 시작</Typography>
               <Chip
                  sx={{
                     background: '#fff',
                     color: '#A57EFF',
                     ml: 'auto',
                     '&:hover': { border: '1px solid #fff', background: 'none', color: '#fff' },
                  }}
                  label={'나가기'}
                  onClick={() => setOpne(!open)}
               />
            </>
         ) : (
            <>
               <Typography>정소희님이 진행 중 입니다.</Typography>
               <Chip
                  sx={{
                     px: 2,
                     borderRadius: 25,
                     height: 50,
                     background: '#fff',
                     color: '#A57EFF',
                     ml: 'auto',
                     '&:hover': { background: 'rgba(225, 225, 225, 0.50)', color: '#fff' },
                  }}
                  label={
                     <Box
                        sx={{
                           display: 'flex',
                           justifyContent: 'center',
                           alignItems: 'center',
                           gap: 2,
                        }}
                        onClick={() => setOpne(!open)}
                     >
                        <AvatarGroup max={4}>
                           {users.map((user) => (
                              <Avatar key={user?.nick} sx={{ width: 32, height: 32 }} alt={user?.nick} src={user?.img} />
                           ))}
                        </AvatarGroup>
                        <Typography>청취 참여하기</Typography>
                     </Box>
                  }
                  onClick={() => setOpne(!open)}
               />
            </>
         )}
      </Box>
   )
}

export default SpaceBar
