import React, { useEffect, useState } from 'react'
import { Box, Typography, Avatar, Button, Grid2, Card, CardMedia, CardContent, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchFundingThunk } from '../features/fundingSlice'
import FundingOverview from '../components/funding/FundingOverview'
import FundingTimeline from '../components/funding/FundingTimeline'
import FundingReview from '../components/funding/FundingReview'
import { Main } from '../styles/BaseStyles'
import dayjs from 'dayjs'

const FundingDetailPage = () => {
   const navigate = useNavigate()
   const location = useLocation()
   const dispatch = useDispatch()
   const { id } = useParams()
   const { funding, loading, error } = useSelector((state) => state.funding)
   const [project, setProject] = useState(null)

   const [tabValue, setTabValue] = useState('1')
   const handleTabChange = (event, newTabValue) => {
      setTabValue(newTabValue)
   }

   const formatDate = (date) => {
      return dayjs(date).format('YYYY-MM-DD')
   }

   useEffect(() => {
      dispatch(fetchFundingThunk(id))
   }, [dispatch, id])

   useEffect(() => {
      if (!funding) return
      setProject({
         image: process.env.REACT_APP_API_URL + '/projectImg' + funding.imgUrl,
         title: funding.title,
         creator: {
            name: funding.Studio.name,
            profileImage: process.env.REACT_APP_API_URL + '/studioImg' + funding.Studio.imgUrl, // 창작자 프로필 이미지
            subscribers: funding.Studio.subscribers || 0,
         },
         fundedAmount: Number(funding.totalOrderPrice), // 현재 모금 금액
         targetAmount: funding.goal,
         startDate: formatDate(funding.startDate),
         endDate: formatDate(funding.enddate),
      })
   }, [funding])

   return (
      project && (
         <Main>
            <Box sx={{ maxWidth: '1000px', margin: 'auto', mt: 5 }}>
               {/* 제목 */}
               <Typography p={1} variant="h2" fontWeight="bold" sx={{ mb: 3, textAlign: 'center' }}>
                  {project.title}
               </Typography>

               {/* 이미지 & 정보 배치 */}
               <Grid2 container spacing={4} alignItems="center" justifyContent="flex-start">
                  {/* 왼쪽 - 대표 이미지 */}
                  <Grid2 size={{ xs: 12, md: 6 }}>
                     <Card sx={{ boxShadow: 'none' }}>
                        <CardMedia component="img" image={project.image} alt="프로젝트 이미지" sx={{ width: '100%', borderRadius: 2 }} />
                     </Card>
                  </Grid2>

                  {/* 오른쪽 - 프로젝트 정보 */}
                  <Grid2 size={{ xs: 12, md: 6 }}>
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
                              {project.fundedAmount.toLocaleString('ko-KR')}원{' '}
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

                           <Button variant="yellow" fullWidth sx={{ mt: 3, py: 1.5, fontSize: '1.1rem', color: '#ffffff' }}>
                              후원하기
                           </Button>
                        </CardContent>
                     </Card>
                  </Grid2>
               </Grid2>
            </Box>
            <Box sx={{ width: '100%', typography: 'body1' }}>
               <TabContext value={tabValue}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                     <TabList onChange={handleTabChange} aria-label="lab API tabs example">
                        <Tab label="프로젝트 소개" value="1" />
                        <Tab label="진행 소식" value="2" />
                        <Tab label="후기" value="3" />
                     </TabList>
                  </Box>
                  <TabPanel value="1">
                     <FundingOverview funding={funding} />
                  </TabPanel>
                  <TabPanel value="2">
                     <FundingTimeline funding={funding} />
                  </TabPanel>
                  <TabPanel value="3">
                     <FundingReview funding={funding} />
                  </TabPanel>
               </TabContext>
            </Box>
         </Main>
      )
   )
}

export default FundingDetailPage
