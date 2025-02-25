import { useSelector } from 'react-redux'
import { Card, CardContent, CardMedia, Typography, Button, Divider } from '@mui/material'
import StudioTab from './tab/StudioTab'
import { Stack2 } from '../../styles/BaseStyles'
import MicIcon from '@mui/icons-material/Mic'
import EditIcon from '@mui/icons-material/Edit'
import { useNavigate } from 'react-router-dom'
import SpaceBox from './SpaceBox'
import SpaceBar from './SpaceBar'

const StudioLayout = () => {
   const { studio } = useSelector((state) => state.studio)
   const { user } = useSelector((state) => state.auth)
   const navigate = useNavigate()
   const Spen = (props) => <Typography component="span" color="green" {...props} />

   const isCreator = studio?.StudioCreators?.some((creator) => creator.Creator?.User?.id === user?.id)

   return (
      <>
         {studio && (
            <>
               <Card variant="none">
                  <CardMedia sx={{ minWidth: 180, height: 180, borderRadius: '10px' }} image={studio.imgUrl ? `${process.env.REACT_APP_API_URL}${studio.imgUrl}` : null} alt="스튜디오 프로필" />
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', py: 0 }}>
                     <Stack2 mb={1} alignItems="center">
                        <Typography variant="h2" fontWeight="bold">
                           {studio.name}
                        </Typography>

                        {isCreator ? (
                           <Stack2>
                              <Button sx={{ background: 'linear-gradient(to right, #4ACBCF, #A57EFF)', color: '#fff', p: 1 }}>
                                 <MicIcon sx={{ fontSize: '20px' }} /> 스페이스
                              </Button>
                              <Button variant="yellow" sx={{ color: '#fff' }} onClick={() => navigate('/community/write')}>
                                 글쓰기
                              </Button>
                           </Stack2>
                        ) : (
                           <Button variant="contained">구독</Button>
                        )}
                     </Stack2>

                     <Stack2 sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                        <Typography color="grey" variant="body1" sx={{ whiteSpace: 'pre-line', flexGrow: 1 }}>
                           {studio.intro}
                        </Typography>
                        {isCreator && <EditIcon size="small" onClick={() => navigate(`/studio/profile/${studio.id}`)} sx={{ ml: 1, cursor: 'pointer' }} />}
                     </Stack2>

                     <Stack2 sx={{ gap: '0 10px' }}>
                        <Typography>
                           달성 프로젝트 <Spen>3건</Spen>
                        </Typography>
                        <Divider orientation="vertical" flexItem />
                        <Typography>
                           구독자 수 <Spen>82명</Spen>
                        </Typography>
                        <Divider orientation="vertical" flexItem />
                        <Typography>
                           최대 달성률 <Spen>1125%</Spen>
                        </Typography>
                     </Stack2>
                  </CardContent>
               </Card>
               <SpaceBar />
               {/* <SpaceBox /> */}
               <StudioTab />
            </>
         )}
      </>
   )
}

export default StudioLayout
