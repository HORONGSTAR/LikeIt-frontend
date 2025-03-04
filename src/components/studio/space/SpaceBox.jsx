import { Typography, Avatar, AvatarGroup, Chip, Stack, Grid2 } from '@mui/material'
import { Stack2, Main } from '../../../styles/BaseStyles'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { flexbox } from '@mui/system'
import { MoveTitle, SpaceScreen } from './SpaceAnimation'
import { Broadcaster, Listener } from './SpaceAudio'

import SpaceChat from './SpaceChat'
import dayjs from 'dayjs'

function SpaceBox({ socket, studio, user }) {
   const [users, setUsers] = useState([])
   const [info, setInfo] = useState(null)
   const [isOpen, setOpen] = useState(false)
   const [isAdmin, setAdmin] = useState(false)
   const [stream, setStream] = useState(null)

   const studioId = studio?.id + '번 스튜디오'

   useEffect(() => {
      if (!socket) return
      socket.emit('space info', studioId)

      socket.on('space info', (info) => {
         setInfo({
            name: info?.admin?.name,
            imgUrl: info?.admin?.imgUrl && process.env.REACT_APP_API_URL + '/userImg' + info.admin.imgUrl,
            startTime: dayjs(info.startTime).format('YYYY년 MM월 DD일 HH시 mm분'),
         })
         setAdmin(info?.admin?.id === user?.id ? true : false)
      })
      return () => {
         socket.off('space info', studioId)
      }
   }, [socket, user, studioId])

   const joinSpace = useCallback(() => {
      socket.emit('join space', studioId)
      socket.on('user info', (info) => {
         setUsers((prev) => [...prev, info])
         setOpen(true)
      })
   }, [socket, studioId])

   const endSpace = useCallback(() => {
      socket.emit('end space', studioId)
      setOpen(false)
      setInfo(null)
   }, [socket, studioId])

   const leaveSpace = useCallback(() => {
      socket.emit('leave space', studioId)
      socket.on('leave space', (userId) => {
         setUsers(users.filter((user) => user?.id !== userId))
      })
      setOpen(false)
   }, [users, socket, studioId])

   const chipSx = {
      background: '#fff',
      color: '#A57EFF',
      border: '2px solid #fff',
      '&:hover': { background: 'none', color: '#fff' },
   }

   const openSx = useMemo(() => {
      return {
         true: {
            radius: '30px 30px 10px 10px',
            comment: info?.startTime + ' · 라이브 시작',
         },
         false: {
            radius: '30px',
            comment: info?.name + '님이 진행 중',
         },
      }
   }, [info])

   const adminSx = useMemo(() => {
      return {
         true: {
            label: '끝내기',
            comment: '스페이스 시작',
            callback: endSpace,
         },
         false: {
            label: '나가기',
            comment: '청취 참여하기',
            callback: leaveSpace,
         },
      }
   }, [endSpace, leaveSpace])

   if (!info) return null

   return (
      <Stack
         sx={{
            background: 'linear-gradient(to right, #4ACBCF, #A57EFF)',
            borderRadius: openSx[isOpen].radius,
            color: '#fff',
            p: 1,
         }}
      >
         <Stack2 sx={{ height: 50 }}>
            <MoveTitle studioName={studio.name}>
               <Typography noWrap variant="body2">
                  {openSx[isOpen].comment}
               </Typography>
            </MoveTitle>
            <Stack2>
               {isOpen ? (
                  <Chip sx={chipSx} label={adminSx[isAdmin].label} onClick={adminSx[isAdmin].callback} />
               ) : (
                  <Chip
                     sx={{ ...chipSx, borderRadius: 7, height: 50 }}
                     label={
                        <Stack2 spacing={{ sm: 1, xs: 0 }} sx={{ flexbox }}>
                           <AvatarGroup sx={{ display: { sm: 'flex', xs: 'none' } }} max={4}>
                              {users.length > 0 &&
                                 users.map((user) => <Avatar key={user.id} alt={user.name} src={user.imgUrl ? process.env.REACT_APP_API_URL + '/userImg' + user.imgUrl : '/default_profile.png'} />)}
                           </AvatarGroup>
                           <Typography fontWeight={600}>{adminSx[isAdmin].comment}</Typography>
                        </Stack2>
                     }
                     onClick={joinSpace}
                  />
               )}
            </Stack2>
         </Stack2>
         {isOpen && (
            <Main>
               <Grid2 container display="flex">
                  <Grid2 size={{ md: 4, sm: 5, xs: 12 }} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                     <SpaceScreen
                        stream={stream}
                        adminName={info.name}
                        audio={isAdmin ? <Broadcaster socket={socket} studioId={studioId} setStream={setStream} /> : <Listener socket={socket} studioId={studioId} setStream={setStream} />}
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
                     </SpaceScreen>
                  </Grid2>
                  <Grid2 p={2} size={{ md: 8, sm: 7, xs: 12 }}>
                     <SpaceChat socket={socket} studioId={studioId} />
                  </Grid2>
               </Grid2>
            </Main>
         )}
      </Stack>
   )
}

export default SpaceBox
