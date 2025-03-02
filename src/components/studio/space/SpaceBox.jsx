import { Typography, Avatar, AvatarGroup, Chip, Stack, Grid2 } from '@mui/material'
import { Stack2, Main } from '../../../styles/BaseStyles'
import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { flexbox } from '@mui/system'
import { UserAudio, AdminAudio } from './SpaceItems'
import { SpaceScreen, MoveTitle } from './SpaceAnimation'
import SpaceChat from './SpaceChat'
import useSocket from '../../../hooks/useSocket'
import dayjs from 'dayjs'

function SpaceBox({ studio, user, start }) {
   const [users, setUsers] = useState([])
   const [spaceInfo, setSpaceInfo] = useState(null)
   const [close, setClose] = useState(false)
   const [isJoin, setJoin] = useState(false)

   const socket = useSocket()

   useEffect(() => {
      if (!socket) return
      socket.emit('space info', studio?.id)
      socket.on('space info', (spaceInfo) => {
         setSpaceInfo(spaceInfo)
      })
      return () => {
         socket.off('space info', studio?.id)
      }
   }, [start, socket, user, studio])

   const joinSpace = useCallback(() => {
      socket.emit('join space', studio?.id)
      socket.on('user info', (userInfo) => {
         setUsers((prev) => [...prev, userInfo])
      })
      setJoin(true)
   }, [socket, studio])

   const endSpace = useCallback(() => {
      socket.emit('end space', studio?.id)
      setSpaceInfo(null)
      setUsers([])
      setClose(true)
   }, [socket, studio])

   const leaveSpace = useCallback(() => {
      socket.emit('leave space', studio?.id)
      socket.on('leave space', (userId) => {
         setUsers(users.filter((user) => user.id !== userId))
      })
      setJoin(false)
   }, [users, socket, studio])

   const admin = useMemo(() => {
      return {
         id: spaceInfo?.admin?.id || null,
         name: spaceInfo?.admin?.name || '이름 없음',
         imgUrl: spaceInfo?.admin?.imgUrl ? process.env.REACT_APP_API_URL + '/userImg' + spaceInfo.admin.imgUrl : '/default_profile.png',
         startTime: dayjs(spaceInfo?.startTime).format('YYYY년 MM월 DD일 HH시 mm분'),
      }
   }, [spaceInfo])

   const isAdmin = useMemo(() => (user?.id === admin.id ? true : false), [admin, user])

   const chipSx = {
      background: '#fff',
      color: '#A57EFF',
      border: '2px solid #fff',
      '&:hover': { background: 'none', color: '#fff' },
   }

   const offButton = useMemo(() => {
      return isAdmin ? <Chip sx={chipSx} label={'끝내기'} onClick={endSpace} /> : <Chip sx={chipSx} label={'나가기'} onClick={leaveSpace} /> // eslint-disable-next-line
   }, [endSpace, leaveSpace, isAdmin])

   if (!spaceInfo) return null

   return (
      <Stack
         sx={{
            background: 'linear-gradient(to right, #4ACBCF, #A57EFF)',
            borderRadius: isAdmin || isJoin ? '30px 30px 10px 10px' : '30px',
            color: '#fff',
            p: 1,
         }}
      >
         <Stack2 sx={{ height: 50 }}>
            <MoveTitle studioName={studio.name}>
               <Typography noWrap variant="body2">
                  {spaceInfo ? admin.startTime + ' · 라이브 시작' : admin.name + '님이 진행 중'}
               </Typography>
            </MoveTitle>
            <Stack2>
               {isAdmin || isJoin ? (
                  offButton
               ) : (
                  <Chip
                     sx={{ ...chipSx, borderRadius: 7, height: 50 }}
                     label={
                        <Stack2 spacing={{ sm: 1, xs: 0 }} sx={{ flexbox }}>
                           <AvatarGroup sx={{ display: { sm: 'flex', xs: 'none' } }} max={4}>
                              {users.length > 0 &&
                                 users.map((user) => <Avatar key={user.id} alt={user.name} src={user.imgUrl ? process.env.REACT_APP_API_URL + '/userImg' + user.imgUrl : '/default_profile.png'} />)}
                           </AvatarGroup>
                           <Typography fontWeight={600}>청취 참여하기</Typography>
                        </Stack2>
                     }
                     onClick={joinSpace}
                  />
               )}
            </Stack2>
         </Stack2>
         {(isAdmin || isJoin) && (
            <Main>
               <Grid2 container display="flex">
                  <Grid2 size={{ md: 4, sm: 5, xs: 12 }} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                     <SpaceScreen adminName={admin.name} audio={isAdmin ? <AdminAudio close={close} studioId={studio.id} /> : <UserAudio studioId={studio.id} adminId={admin.id} />}>
                        <Avatar
                           src={admin.imgUrl}
                           alt={admin.name}
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
                     <SpaceChat studioId={studio?.id} />
                  </Grid2>
               </Grid2>
            </Main>
         )}
      </Stack>
   )
}

export default SpaceBox
