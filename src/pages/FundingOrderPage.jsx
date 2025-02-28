import React, { useCallback, useEffect, useState } from 'react'
import { Box, Typography, Avatar, Button, Grid2, Card, CardMedia, CardContent, TextField } from '@mui/material'
import { useLocation, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchFundingThunk, orderRegThunk } from '../features/fundingSlice'
import { ErrorBox, LoadingBox, Main } from '../styles/BaseStyles'
import dayjs from 'dayjs'
import { padding } from '@mui/system'

function FundingOrderPage() {
   const dispatch = useDispatch()
   const { id } = useParams()
   const { funding, loading, error } = useSelector((state) => state.funding)
   const { user, isAuthenticated } = useSelector((state) => state.auth)
   const [project, setProject] = useState(null)
   const [orderFlag, setOrderFlag] = useState(false)
   const [errorOpen, setErrorOpen] = useState(false)

   const [address, setAddress] = useState('')
   const [addressDetail, setAddressDetail] = useState('')
   const [phone, setPhone] = useState('')
   const [account, setAccount] = useState('')
   const [usePoint, setUsePoint] = useState(0)

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
               <Grid2 sx={{ textAlign: 'center' }} size={{ xs: 7 }}>
                  <Typography my={1}>{reward.name}</Typography>
                  {reward.RewardProducts.map((product) => {
                     return (
                        <Typography key={product.id}>
                           · {product.title} (x{product.RewardProductRelation.stock})
                        </Typography>
                     )
                  })}
               </Grid2>
               <Grid2 sx={{ textAlign: 'center' }} my={1} size={{ xs: 2 }}>
                  x{orderRewardBasket[reward.id]}
               </Grid2>
               <Grid2 sx={{ textAlign: 'center' }} my={1} size={{ xs: 3 }}>
                  {(orderRewardBasket[reward.id] * reward.price).toLocaleString()}원
               </Grid2>
            </Grid2>
         )
      })
   }

   // 총 가격 계산
   const totalPrice = funding?.Rewards.reduce((acc, reward) => {
      if (!orderRewardBasket[reward.id]) return acc
      return acc + orderRewardBasket[reward.id] * reward.price
   }, 0)

   // 폼 제출
   const handleSubmit = useCallback(
      (e) => {
         if (!funding) return
         const rewards = funding.Rewards
         let orderPrices = []
         rewards.map((reward) => orderPrices.push(orderRewardBasket[reward.id] * reward.price))

         const orderData = {
            orderPrices: orderPrices,
            address: address,
            account: account,
            rewards: orderRewardBasket,
            projectId: funding.id,
         }
         if (usePoint) orderData.usePoint = usePoint
         console.log(orderData)
         dispatch(orderRegThunk(orderData))
         setOrderFlag(true)
      },
      [address, account, usePoint, orderRewardBasket, dispatch]
   )

   // 로딩 에러 처리
   if (loading) return <LoadingBox />
   if (error) return <ErrorBox error={error} open={errorOpen} setOpen={setErrorOpen} />

   return orderFlag ? (
      <Main>
         <Typography variant="h3" sx={{ textAlign: 'center' }}>
            주문이 성공적으로 완료되었습니다.
         </Typography>
      </Main>
   ) : (
      project && funding?.projectStatus === 'ON_FUNDING' && (
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
                  <Grid2 sx={{ textAlign: 'center' }} size={{ xs: 7 }}>
                     선택 리워드
                  </Grid2>
                  <Grid2 sx={{ textAlign: 'center' }} size={{ xs: 2 }}>
                     수량
                  </Grid2>
                  <Grid2 sx={{ textAlign: 'center' }} size={{ xs: 3 }}>
                     가격
                  </Grid2>
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
                     paddingLeft: '8px',
                  },
               }}
            >
               <Grid2 size={{ sm: 3, xs: 4 }} p={2}>
                  배송지
               </Grid2>
               <Grid2 size={{ sm: 5, xs: 8 }} p={1}>
                  <input value={address} onChange={(e) => setAddress(e.target.value)} type="text" style={{ height: '100%', width: '100%' }} />
               </Grid2>
               <Grid2 size={{ sm: 4, xs: 12 }}>
                  <Button size="small" variant="contained" sx={{ backgroundColor: '#d97400', margin: '10px', fontSize: '0.8em' }}>
                     배송지 관리
                  </Button>
               </Grid2>
               <Grid2 size={{ sm: 3, xs: 4 }} p={2}>
                  상세주소
               </Grid2>
               <Grid2 size={{ sm: 5, xs: 8 }} p={1}>
                  <input value={addressDetail} onChange={(e) => setAddressDetail(e.target.value)} type="text" style={{ height: '100%', width: '100%' }} />
               </Grid2>
               <Grid2 size={{ sm: 4, xs: 0 }}></Grid2>
               <Grid2 size={{ sm: 3, xs: 4 }} p={2}>
                  연락처
               </Grid2>
               <Grid2 size={{ sm: 4, xs: 8 }} p={1}>
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} type="text" style={{ height: '100%', width: '100%' }} />
               </Grid2>
               <Grid2 size={{ sm: 5, xs: 0 }}></Grid2>
               <Grid2 size={{ sm: 3, xs: 4 }} p={2}>
                  출금계좌
               </Grid2>
               <Grid2 size={{ sm: 4, xs: 8 }} p={1}>
                  <input value={account} onChange={(e) => setAccount(e.target.value)} type="text" style={{ height: '100%', width: '100%' }} />
               </Grid2>
               <Grid2 size={{ sm: 5, xs: 0 }}></Grid2>
               <Grid2 size={{ sm: 3, xs: 4 }} p={2}>
                  보유포인트
               </Grid2>
               <Grid2 size={{ sm: 4, xs: 8 }} p={2}>
                  {user?.point}
               </Grid2>
               <Grid2 size={{ sm: 5, xs: 12 }} p={2}>
                  {((totalPrice / 100) * 5).toLocaleString('')} 포인트 적립 예정
               </Grid2>
               <Grid2 size={{ sm: 3, xs: 4 }} p={2}>
                  포인트사용
               </Grid2>
               <Grid2 size={{ sm: 4, xs: 8 }} p={1}>
                  <input
                     value={usePoint}
                     onChange={(e) => {
                        const inputValue = Number(e.target.value) || 0
                        setUsePoint(Math.min(inputValue, user?.point))
                     }}
                     type="text"
                     style={{ height: '100%', width: '100%' }}
                  />
               </Grid2>
               <Grid2 size={{ sm: 5, xs: 0 }}></Grid2>
               <Grid2 m={2}>
                  <Typography variant="h4">합계 {(totalPrice - usePoint).toLocaleString('')}원</Typography>
               </Grid2>
               <Grid2 m={1}>
                  <Button onClick={handleSubmit} sx={{ backgroundColor: '#d97400' }} variant="contained">
                     후원하기
                  </Button>
               </Grid2>
            </Grid2>
         </Main>
      )
   )
}

export default FundingOrderPage
