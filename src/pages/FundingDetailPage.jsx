import React from 'react'
import { Box, Typography, Avatar, Button, Grid, Card, CardMedia, CardContent, Tabs, Tab } from '@mui/material'

import { useNavigate, useParams } from 'react-router-dom'
import FundingOverview from '../components/funding/FundingOverview'
import FundingReview from '../components/funding/FundingReview'
import FundingTimeline from '../components/funding/FundingTimeline'

const FundingDetailPage = () => {
   const navigate = useNavigate()

   const tabs = [
      { label: '프로젝트 소개', path: '/funding/detail', content: <FundingOverview /> },
      { label: '진행 소식', path: '/funding/timeline', content: <FundingTimeline /> },
      { label: '후기', path: '/funding/review', content: <FundingReview /> },
   ]

   const project = {
      image: '/images/chocolate.jpg', // 대표 이미지
      title: '[발렌타인데이] 사랑을 전하는 초코볼', // 프로젝트 제목
      creator: {
         name: '꿈빛 파티세리',
         profileImage: 'https://source.unsplash.com/100x100/?chef', // 창작자 프로필 이미지
         subscribers: 120,
      },
      fundedAmount: 2779500, // 현재 모금 금액
      targetAmount: 500000, // 목표 금액
      startDate: '2025.01.21',
      endDate: '2025.02.02',
   }

   return (
      <Box sx={{ maxWidth: '1000px', margin: 'auto', mt: 5 }}>
         {/* 제목 */}
         <Typography variant="h4" fontWeight="bold" sx={{ mb: 3, textAlign: 'center' }}>
            {project.title}
         </Typography>

         {/* 이미지 & 정보 배치 */}
         <Grid container spacing={4} alignItems="center" justifyContent="flex-start">
            {/* 왼쪽 - 대표 이미지 */}
            <Grid item xs={12} md={6}>
               <Card sx={{ boxShadow: 'none' }}>
                  <CardMedia component="img" image={project.image} alt="프로젝트 이미지" sx={{ width: '100%', borderRadius: 2 }} />
               </Card>
            </Grid>

            {/* 오른쪽 - 프로젝트 정보 */}
            <Grid item xs={12} md={6}>
               <Card sx={{ p: 1, boxShadow: 'none' }}>
                  <CardContent sx={{ textAlign: 'left' }}>
                     <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar src={project.creator.profileImage} sx={{ width: 50, height: 50, mr: 2 }} />
                        <Box>
                           <Typography variant="subtitle1" fontWeight="bold">
                              {project.creator.name}
                           </Typography>
                           <Typography variant="body2" color="text.secondary">
                              구독자 수 {project.creator.subscribers}명
                           </Typography>
                        </Box>
                     </Box>

                     <Typography variant="h5" fontWeight="bold" color="primary">
                        {project.fundedAmount.toLocaleString()}원{' '}
                        <Typography component="span" variant="h6" color="text.secondary">
                           {Math.round((project.fundedAmount / project.targetAmount) * 100)}%
                        </Typography>
                     </Typography>

                     <Typography color="text.secondary" sx={{ mt: 1 }}>
                        목표 금액: {project.targetAmount.toLocaleString()}원
                     </Typography>

                     <Typography color="text.secondary">
                        펀딩 기간: {project.startDate} ~ {project.endDate}
                     </Typography>

                     <Button variant="yellow" fullWidth sx={{ mt: 3, py: 1.5, fontSize: '1.1rem' }}>
                        후원하기
                     </Button>
                  </CardContent>
               </Card>
            </Grid>
         </Grid>

         <Tabs value={false} onChange={(e, newValue) => navigate(tabs[newValue].path)}>
            {tabs.map((tab, index) => (
               <Tab key={index} label={tab.label} />
            ))}
         </Tabs>
      </Box>
   )
}

export default FundingDetailPage
