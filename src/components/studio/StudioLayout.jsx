import { useSelector } from 'react-redux'
import { Card, CardContent, CardMedia, Typography, Button, Divider, Stack } from '@mui/material'
import StudioTab from './tab/StudioTab'
import { Stack2 } from '../../styles/BaseStyles'
import MicIcon from '@mui/icons-material/Mic'
import { useNavigate } from 'react-router-dom'
import SpaceBar from './space/SpaceBar'
import { useMemo, useEffect, useCallback, useState } from 'react'
import { socket } from './space/SpaceItems'

const StudioLayout = () => {
   const { studio, projects } = useSelector((state) => state.studio)
   const { user } = useSelector((state) => state.auth)
   const [spaceInfo, setSpaceInfo] = useState(null)
   const navigate = useNavigate()

   const startSpace = useCallback(() => {
      socket.emit('start space', studio?.id)
   }, [socket, user, studio])

   useEffect(() => {
      socket.emit('join space', studio?.id)
      socket.on('space info', (spaceInfo) => {
         setSpaceInfo(spaceInfo)
      })
   }, [socket, studio])
   const isCreator = useMemo(() => {
      const checked = studio?.StudioCreators?.filter((creator) => creator.Creator?.User?.id === user?.id)

      return checked.length > 0
         ? {
              leader: checked[0].role === 'LEADER' ? true : false,
              cmAdmin: checked[0].communityAdmin === 'Y' ? true : false,
              spAdmin: checked[0].spaceAdmin === 'Y' ? true : false,
           }
         : false
   }, [studio, user])

   const completeProjects = useMemo(() => projects.filter((project) => project.projectStatus === 'FUNDING_COMPLETE'), [projects])

   const maxPercent = useMemo(() => (completeProjects.length > 0 ? Math.floor(Math.max(...completeProjects.map((project) => project.totalOrderPrice / project.goal)) * 100) : 0), [completeProjects])

   const Spen = (props) => <Typography component="span" color="green" {...props} />

   return (
      <>
         {studio && (
            <>
               <Card variant="none" sx={{ display: 'flex', flexWrap: 'nowrap' }}>
                  <CardMedia sx={{ minWidth: 180, height: 180, borderRadius: '10px' }} image={studio.imgUrl ? `${process.env.REACT_APP_API_URL}${studio.imgUrl}` : null} alt="스튜디오 프로필" />
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', py: 0 }}>
                     <Stack2 mb={1} alignItems="center">
                        <Typography variant="h2" fontWeight="bold">
                           {studio.name}
                        </Typography>

                        {isCreator ? (
                           <Stack2>
                              {isCreator.spAdmin && (
                                 <Button sx={{ background: 'linear-gradient(to right, #4ACBCF, #A57EFF)', color: '#fff', p: 1 }} onClick={startSpace}>
                                    <MicIcon sx={{ fontSize: '20px' }} /> 스페이스
                                 </Button>
                              )}
                              {isCreator.cmAdmin && (
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
                        {isCreator.leader && (
                           <Button sx={{ opacity: 0.8, width: 120, ml: 'auto' }} size="small" onClick={() => navigate(`/studio/profile/${studio.id}`)}>
                              <img src="/images/icon/edit.svg" width="15" />
                              &nbsp;소개 수정하기
                           </Button>
                        )}
                     </Stack>
                     <Stack2 sx={{ gap: '0 10px' }}>
                        <Typography>
                           달성 프로젝트 <Spen>{completeProjects.length}건</Spen>
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
               {spaceInfo !== null && <SpaceBar spaceInfo={spaceInfo} studio={studio} />}
               <StudioTab />
            </>
         )}
      </>
   )
}

export default StudioLayout
