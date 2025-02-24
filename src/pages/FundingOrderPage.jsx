import React, { useEffect, useState } from 'react'
import { Box, Typography, Avatar, Button, Grid2, Card, CardMedia, CardContent } from '@mui/material'
import { useLocation, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchFundingThunk } from '../features/fundingSlice'
import { Main } from '../styles/BaseStyles'
import dayjs from 'dayjs'

function FundingOrderPage() {
   const dispatch = useDispatch()
   const { id } = useParams()
   const { funding, loading, error } = useSelector((state) => state.funding)
   const { user } = useSelector((state) => state.auth)
   const [project, setProject] = useState(null)

   const location = useLocation()
   const orderRewardBasket = location.state?.orderRewardBasket || {}

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

   // 리워드 체크
   const rewardsCheck = () => {
      const rewards = funding.Rewards
      return rewards.map((reward) => {
         if (!orderRewardBasket[reward.id]) return

         return (
            <Grid2 m={1} key={reward.id} container>
               <Grid2 size={{ sm: 8 }}>
                  <Typography my={1}>{reward.name}</Typography>
                  {reward.RewardProducts.map((product) => {
                     return (
                        <Typography key={product.id}>
                           · {product.title} (x{product.RewardProductRelation.stock})
                        </Typography>
                     )
                  })}
               </Grid2>
               <Grid2 my={1} size={{ sm: 2 }}>
                  x{orderRewardBasket[reward.id]}
               </Grid2>
               <Grid2 my={1} size={{ sm: 2 }}>
                  {(orderRewardBasket[reward.id] * reward.price).toLocaleString()}원
               </Grid2>
            </Grid2>
         )
      })
   }

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
                        </CardContent>
                     </Card>
                  </Grid2>
               </Grid2>
            </Box>
            <Box sx={{ width: '100%', typography: 'body1', border: '1px solid #dddddd' }}>
               <Grid2 m={1} container>
                  <Grid2 size={{ sm: 8 }}>선택 리워드</Grid2>
                  <Grid2 size={{ sm: 2 }}>수량</Grid2>
                  <Grid2 size={{ sm: 2 }}>가격</Grid2>
               </Grid2>
               {rewardsCheck()}
            </Box>
            <Grid2
               container
               p={1}
               sx={{
                  width: '100%',
                  border: '1px solid #dddddd',
                  '& input': {
                     border: '1px solid #dddddd',
                     height: '2em',
                     borderRadius: '5px',
                  },
               }}
            >
               <Grid2 size={{ sm: 3 }} p={2}>
                  배송지
               </Grid2>
               <Grid2 size={{ sm: 3 }} p={1}>
                  <input type="text" style={{ height: '100%' }} />
               </Grid2>
               <Grid2 size={{ sm: 6 }} p={1}>
                  <Button variant="contained" sx={{ margin: '0' }}>
                     배송지 관리
                  </Button>
               </Grid2>
               <Grid2 size={{ sm: 3 }} p={2}>
                  상세주소
               </Grid2>
               <Grid2 size={{ sm: 9 }} p={1}>
                  <input type="text" style={{ height: '100%' }} />
               </Grid2>
               <Grid2 size={{ sm: 3 }} p={2}>
                  연락처
               </Grid2>
               <Grid2 size={{ sm: 9 }} p={1}>
                  <input type="text" style={{ height: '100%' }} />
               </Grid2>
               <Grid2 size={{ sm: 3 }} p={2}>
                  출금계좌
               </Grid2>
               <Grid2 size={{ sm: 9 }} p={1}>
                  <input type="text" style={{ height: '100%' }} />
               </Grid2>
               <Grid2 size={{ sm: 3 }} p={2}>
                  포인트
               </Grid2>
               <Grid2 size={{ sm: 3 }} p={1}>
                  {user?.point}
               </Grid2>
               <Grid2 size={{ sm: 6 }} p={1}>
                  asdf
               </Grid2>
               <Grid2 size={{ sm: 3 }} p={2}>
                  포인트사용
               </Grid2>
               <Grid2 size={{ sm: 9 }} p={1}>
                  <input type="text" style={{ height: '100%' }} />
               </Grid2>
            </Grid2>
         </Main>
      )
   )
}

export default FundingOrderPage
