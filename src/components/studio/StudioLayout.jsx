import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardMedia, Typography, Button, Divider } from '@mui/material'
import BasicTabs from '../../components/mui/Tabs'
import StudioNavber from '../shared/StudioNavber'
import StudioTab from '../studio/StudioTab'
import ProjectTab from '../studio/ProjectTab'
import SpaceBar from '../studio/SpaceBar'
import { useState } from 'react'
import { Main, Stack2 } from '../../styles/BaseStyles'

const StudioLayout = () => {
   const [posts, setPosts] = useState([])
   const location = useLocation()
   const navigate = useNavigate()

   const tabs = [
      { label: '스튜디오', path: '/studio', content: <StudioTab /> },
      { label: '프로젝트', path: '/studio', content: <ProjectTab /> },
      { label: '커뮤니티', path: '/studio/community' },
   ]

   const Spen = (props) => <Typography component="span" color="green" {...props} />

   return (
      <>
         <StudioNavber />
         <Main>
            <Card variant="none">
               <CardMedia sx={{ width: 180, height: 180, borderRadius: '10px' }} image="/images/발레리나.jpg" alt="발레리나" />
               <CardContent>
                  <Stack2 mb={1} alignItems="end">
                     <Typography variant="h2" fontWeight="bold">
                        가트발레단
                     </Typography>
                     <Button variant="contained">구독</Button>
                  </Stack2>
                  <Typography color="text.secondary">
                     한국대학교 발레단 가트발레단입니다.
                     <br /> 공연과 무료 수업을 진행 중입니다. 감사합니다.
                  </Typography>
                  <Stack2 sx={{ mt: 'auto', gap: '0 10px' }}>
                     <Typography>
                        달성 프로젝트 <Spen>3건</Spen>
                     </Typography>
                     <Divider orientation="vertical" variant="middle" flexItem />
                     <Typography>
                        구독자 수 <Spen>82명</Spen>
                     </Typography>
                     <Divider orientation="vertical" variant="middle" flexItem />
                     <Typography>
                        최대 달성률 <Spen>1125%</Spen>
                     </Typography>
                  </Stack2>
               </CardContent>
            </Card>
            <SpaceBar />

            <BasicTabs tabs={tabs} currentPath={location.pathname} onChange={(path) => navigate(path)} />

            <Outlet context={{ posts }} />
         </Main>
      </>
   )
}

export default StudioLayout
