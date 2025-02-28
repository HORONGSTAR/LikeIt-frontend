import React, { useEffect, useState } from 'react'
import { Box, Typography, Avatar, Button, Grid2, Card, CardMedia, CardContent, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchFundingThunk } from '../features/fundingSlice'
import FundingOverview from '../components/funding/FundingOverview'
import FundingTimeline from '../components/funding/FundingTimeline'
import FundingReview from '../components/funding/FundingReview'
import { ErrorBox, LoadingBox, Main } from '../styles/BaseStyles'
import dayjs from 'dayjs'

const FundingDetailPage = () => {
   const dispatch = useDispatch()
   const { id } = useParams()
   const { funding, loading, error } = useSelector((state) => state.funding)
   const { isAuthenticated } = useSelector((state) => state.auth)
   const [project, setProject] = useState(null)
   const [noReward, setNoReward] = useState('')

   const [orderRewardBasket, setOrderRewardBasket] = useState({})

   const orderPlusReward = (basket) => {
      setOrderRewardBasket(basket)
   }
   const orderMinusReward = (basket) => {
      setOrderRewardBasket(basket)
   }

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

   let status = ''
   if (funding?.projectStatus === 'FUNDING_COMPLETE')
      status = (
         <Typography variant="h5" p={2}>
            펀딩에 성공했습니다! 후속 안내를 기다려주세요
         </Typography>
      )
   else if (funding?.projectStatus === 'FUNDING_FAILED')
      status = (
         <Typography variant="h5" p={2}>
            아쉽게도 펀딩이 실패로 종료됐습니다...
         </Typography>
      )

   return (
      project &&
      funding?.proposalStatus === 'COMPLETE' && (
         <Main>
            <Box sx={{ maxWidth: '1000px', margin: 'auto', mt: 5 }}>
               {/* 제목 */}
               <Typography p={1} variant="h2" fontWeight="bold" sx={{ mb: 3, textAlign: 'center' }}>
                  {project.title}
               </Typography>

               {/* 이미지 & 정보 배치 */}
               <Grid2 container spacing={4} alignItems="center" justifyContent="flex-start">
                  {/* 왼쪽 - 대표 이미지 */}
                  <Grid2 size={{ xs: 12, sm: 6 }}>
                     <Card sx={{ boxShadow: 'none' }}>
                        <CardMedia component="img" image={project.image} alt="프로젝트 이미지" sx={{ width: '100%', borderRadius: 2, maxHeight: '400px', objectFit: 'cover' }} />
                     </Card>
                  </Grid2>

                  {/* 오른쪽 - 프로젝트 정보 */}
                  <Grid2 size={{ xs: 12, sm: 6 }}>
                     <Card sx={{ p: 1, boxShadow: 'none' }}>
                        <CardContent sx={{ textAlign: 'left' }}>
                           <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                              <Avatar onClick={() => (window.location.href = `/studio/${funding.Studio.id}`)} src={project.creator.profileImage} sx={{ width: 50, height: 50, mr: 2, cursor: 'pointer' }} />
                              <Box>
                                 <Typography onClick={() => (window.location.href = `/studio/${funding.Studio.id}`)} variant="subtitle1" fontWeight="bold" sx={{ cursor: 'pointer' }}>
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
                           {status
                              ? status
                              : isAuthenticated && (
                                   <Link
                                      to={Object.keys(orderRewardBasket).length > 0 ? `/funding/order/${funding.id}` : undefined}
                                      onClick={(e) => {
                                         if (Object.keys(orderRewardBasket).length === 0) {
                                            e.preventDefault()
                                            setNoReward('리워드를 선택해주세요')
                                         }
                                      }}
                                      state={{ orderRewardBasket: orderRewardBasket }}
                                   >
                                      <Button variant="yellow" fullWidth sx={{ mt: 3, py: 1.5, fontSize: '1.1rem', color: '#ffffff' }}>
                                         후원하기
                                      </Button>
                                   </Link>
                                )}
                           <Typography sx={{ color: 'red', textAlign: 'center' }}>{noReward}</Typography>
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
                     <FundingOverview funding={funding} loading={loading} error={error} orderPlusReward={orderPlusReward} orderMinusReward={orderMinusReward} />
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
