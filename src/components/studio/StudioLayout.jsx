import { Card, CardContent, CardMedia, Typography, Button, Divider, Stack } from '@mui/material'
import { Stack2 } from '../../styles/BaseStyles'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import StartButton from './space/StartButton'
import StudioTab from './tab/StudioTab'
import SpaceBox from './space/SpaceBox'
import useSocket from '../../hooks/useSocket'

function StudioLayout() {
   const { studio, projects } = useSelector((state) => state.studio)
   const { user } = useSelector((state) => state.auth)
   const socket = useSocket()
   const navigate = useNavigate()

   const isMumber = useMemo(() => {
      const isAdmin = { LEADER: true, cmY: true, spY: true }
      const checked = studio?.StudioCreators?.filter((sc) => sc.Creator?.User?.id === user?.id)
      const result = checked.length > 0 && {
         leader: isAdmin[checked[0].role],
         cmAdmin: isAdmin['cm' + checked[0].communityAdmin],
         spAdmin: isAdmin['sp' + checked[0].spaceAdmin],
      }
      return result
   }, [studio, user])

   const complete = useMemo(() => {
      return projects.filter((project) => project.projectStatus === 'FUNDING_COMPLETE')
   }, [projects])

   const maxPercent = useMemo(() => {
      return complete.length > 0 ? Math.floor(Math.max(...complete.map((p) => p.totalOrderPrice / p.goal)) * 100) : 0
   }, [complete])

   const Spen = (props) => <Typography component="span" color="green" {...props} />

   return (
      <>
         <Card variant="none" sx={{ display: 'flex', flexWrap: 'nowrap' }}>
            <CardMedia sx={{ minWidth: 180, height: 180, borderRadius: '10px' }} image={studio.imgUrl ? process.env.REACT_APP_API_URL + studio.imgUrl : null} alt="스튜디오 프로필" />
            <CardContent sx={{ display: 'flex', flexDirection: 'column', py: 0 }}>
               <Stack2 mb={1} alignItems="center">
                  <Typography variant="h2" fontWeight="bold">
                     {studio.name}
                  </Typography>
                  {isMumber ? (
                     <Stack2>
                        {isMumber.spAdmin && <StartButton socket={socket} studioId={studio?.id + '번 스튜디오'} />}
                        {isMumber.cmAdmin && (
                           <Button variant="yellow" onClick={() => navigate('/community/write')}>
                              글쓰기
                           </Button>
                        )}
                     </Stack2>
                  ) : (
                     <Button variant="contained">구독</Button>
                  )}
               </Stack2>

               <Stack>
                  <Typography color="grey" sx={{ whiteSpace: 'pre-wrap' }}>
                     {studio.intro}
                  </Typography>
                  {isMumber.leader && (
                     <Button sx={{ opacity: 0.8, width: 120, ml: 'auto' }} size="small" onClick={() => navigate(`/studio/profile/${studio.id}`)}>
                        <img alt="수정하기" src="/images/icon/edit.svg" width="15" />
                        &nbsp;소개 수정하기
                     </Button>
                  )}
               </Stack>
               <Stack2 sx={{ gap: '0 10px' }}>
                  <Typography>
                     달성 프로젝트 <Spen>{complete.length}건</Spen>
                  </Typography>
                  <Divider orientation="vertical" flexItem />
                  <Typography>
                     구독자 <Spen>{studio.Users?.length}명</Spen>
                  </Typography>
                  <Divider orientation="vertical" flexItem />
                  <Typography>
                     최대 달성률 <Spen>{maxPercent}%</Spen>
                  </Typography>
               </Stack2>
            </CardContent>
         </Card>
         <SpaceBox socket={socket} studio={studio} user={user} />
         <StudioTab />
      </>
   )
}

export default StudioLayout
