import BasicTabs from '../components/ui/Tabs'
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material'

import StudioTab from '../components/studiotabs/StudioTab'
import ProjectTab from '../components/studiotabs/ProjectTab'
import CommunityTab from '../components/studiotabs/CommunityTab'
import SpaceBar from '../components/space/SpaceBar'

const Studiopage = () => {
   const tabs = [
      { label: '스튜디오', content: <StudioTab /> },
      { label: '프로젝트', content: <ProjectTab /> },
      { label: '커뮤니티', content: <CommunityTab /> },
   ]

   return (
      <Box sx={{ maxWidth: '1200px', width: '100%', ml: '20px', margin: 'auto' }}>
         <Card sx={{ display: 'flex', maxWidth: 1200, p: 2, boxShadow: 'none', border: 'none' }}>
            {/* 왼쪽 이미지 */}
            <CardMedia component="img" sx={{ width: 200, height: 200, borderRadius: 2 }} image="/images/발레리나.jpg" alt="발레리나" />

            {/* 오른쪽 정보 */}
            <CardContent sx={{ flex: 1, ml: 2 }}>
               <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h4" fontWeight="bold">
                     가트발레단
                  </Typography>
                  <Button
                     variant="contained"
                     sx={{
                        backgroundColor: 'black',
                        color: 'white',
                        fontSize: '12px',
                        ml: 1,
                        px: 1.5,
                        py: 0.5,
                        '&:hover': { backgroundColor: '#333' },
                        boxShadow: 'none',
                     }}
                  >
                     구독
                  </Button>
               </Box>
               <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontSize: '14px' }}>
                  한국대학교 발레단 가트발레단입니다. 공연과 무료 수업을 진행 중입니다. 감사합니다.
               </Typography>
               <Typography variant="body2" sx={{ mt: 1, fontSize: '14px' }}>
                  달성 프로젝트 <span style={{ color: '#4caf50' }}>3건</span> | 구독자 수 <span style={{ color: '#4caf50' }}>82명</span> | 최대 달성률{' '}
                  <span style={{ color: '#4caf50' }}>1125%</span>
               </Typography>
            </CardContent>
         </Card>

         <SpaceBar />

         <BasicTabs tabs={tabs} />
      </Box>
   )
}

export default Studiopage
