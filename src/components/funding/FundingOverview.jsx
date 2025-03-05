import { Box, Grid2, IconButton, Typography } from '@mui/material'
import { ErrorBox, LoadingBox, SubTitle } from '../../styles/BaseStyles'
import { TabLink } from '../../components/ui/Tabs'
import { useState } from 'react'
import { AddCircle, RemoveCircle } from '@mui/icons-material'

function FundingOverview({ funding, loading, error, orderPlusReward, orderMinusReward }) {
   const [rewardBasket, setRewardBasket] = useState({})
   const [errorOpen, setErrorOpen] = useState(false)

   const plusReward = (rid) => {
      setRewardBasket((prevData) => {
         const updatedBasket = {
            ...prevData,
            [rid]: prevData[rid] + 1,
         }
         orderPlusReward(updatedBasket)
         return updatedBasket
      })
   }
   const minusReward = (rid) => {
      if (0 > rewardBasket[rid] - 1) return
      setRewardBasket((prevData) => {
         const updatedBasket = {
            ...prevData,
            [rid]: prevData[rid] - 1,
         }
         orderMinusReward(updatedBasket)
         return updatedBasket
      })
   }

   const showProduct = () => {
      const productSet = new Set()
      let productInfo = []

      return (
         <>
            {funding.Rewards.map((reward) => (
               <Box
                  p={2}
                  my={1}
                  key={reward.id}
                  sx={{
                     border: '1px solid #dddddd',
                     borderRadius: '10px',
                  }}
               >
                  <Typography variant="h5">{reward.name}</Typography>
                  <Typography variant="body2" color="#666666">
                     {reward.contents}
                  </Typography>
                  {reward.RewardProducts.map((product) => {
                     if (productSet.has(product.id)) {
                     } else {
                        productSet.add(product.id)
                        productInfo.push(
                           <Grid2
                              size={{
                                 xs: 12,
                                 sm: 6,
                              }}
                              spacing={2}
                              key={product.id}
                           >
                              <img
                                 src={process.env.REACT_APP_API_URL + '/rewardProduct/' + product.imgUrl}
                                 style={{
                                    width: '100%',
                                    height: '180px',
                                    objectFit: 'cover',
                                    borderRadius: '10px',
                                 }}
                              />
                              <Typography>{product.title}</Typography>
                              <Typography>{product.contents}</Typography>
                           </Grid2>
                        )
                     }
                     return (
                        <Typography key={product.id}>
                           {product.title} x{product.RewardProductRelation.stock}
                        </Typography>
                     )
                  })}
               </Box>
            ))}
            <Typography variant="h5" mb={1} mt={3}>
               선물 구성품
            </Typography>
            <Grid2
               container
               spacing={2}
               sx={{
                  flexDirection: {
                     xs: 'column',
                     sm: 'row',
                  },
               }}
            >
               {productInfo}
            </Grid2>
         </>
      )
   }

   const showBudget = () => {
      return funding.ProjectBudgets.map((budget) => (
         <Box key={budget.id}>
            <Typography>{budget.contents}</Typography>
            <Typography>{budget.money.toLocaleString()}원</Typography>
         </Box>
      ))
   }

   const showReward = () => {
      return (
         <>
            {funding.Rewards.map((reward) => {
               const rid = reward.id
               if (!rewardBasket[rid]) rewardBasket[rid] = 0
               return (
                  <Box
                     key={reward.id}
                     sx={{
                        position: 'relative',
                        border: '1px solid #dddddd',
                        borderRadius: '10px',
                        boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.1)',
                        p: 2,
                        ml: 2,
                        mb: 2,
                        backgroundColor: 'white',
                     }}
                  >
                     {/* 가격 & 개수 남음 한 줄에 정렬 */}
                     <Box
                        sx={{
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'space-between', // 가격과 개수 남음 양쪽 정렬
                           mb: 1,
                        }}
                     >
                        <Typography variant="h5" fontWeight="bold">
                           {reward.price.toLocaleString()}원
                        </Typography>

                        {/* 남은 개수 표시 */}
                        {reward.stock > 0 && (
                           <Box
                              sx={{
                                 backgroundColor: '#EEEEEE',
                                 color: '#666666',
                                 fontSize: { xs: '0.75rem', sm: '0.8rem' }, // 반응형 폰트 크기
                                 fontWeight: 'bold',
                                 px: 1.5,
                                 py: 0.5,
                                 borderRadius: '12px',
                                 whiteSpace: 'nowrap', // 줄바꿈 방지
                              }}
                           >
                              {reward.stock}개 남음
                           </Box>
                        )}
                     </Box>

                     {/* 리워드 정보 */}
                     <Typography variant="body2" mb={1}>
                        {reward.name}
                     </Typography>
                     {reward.RewardProducts.map((product) => (
                        <Typography key={product.id}>
                           · {product.title} x{product.RewardProductRelation.stock}
                        </Typography>
                     ))}

                     {/* 수량 선택 버튼 */}
                     <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1 }}>
                        <IconButton onClick={() => minusReward(rid)}>
                           <RemoveCircle color="primary" />
                        </IconButton>
                        <Typography sx={{ lineHeight: '40px', px: 2 }}>{rewardBasket[rid]}</Typography>
                        <IconButton onClick={() => plusReward(rid)}>
                           <AddCircle color="primary" />
                        </IconButton>
                     </Box>
                  </Box>
               )
            })}
         </>
      )
   }

   const content = (
      <Box className="line">
         <SubTitle>프로젝트 소개</SubTitle>
         <Typography mt={1}>{funding.contents}</Typography>
      </Box>
   )

   const gift = (
      <Box className="line">
         <SubTitle>선물 소개</SubTitle>
         <Box mt={1}>{showProduct()}</Box>
      </Box>
   )

   const schedule = (
      <Box className="line">
         <SubTitle>일정표</SubTitle>
         <Box mt={1}>{funding.schedule}</Box>
      </Box>
   )

   const budget = (
      <Box className="line">
         <SubTitle>프로젝트 예산</SubTitle>
         <Box mt={1}>
            <ol style={{ paddingLeft: '20px', margin: '10px 0' }}>
               {funding.ProjectBudgets.map((budget) => (
                  <li key={budget.id} style={{ marginBottom: '5px' }}>
                     <Typography>
                        {budget.contents} {budget.money.toLocaleString()}원
                     </Typography>
                  </li>
               ))}
            </ol>
         </Box>
         <Typography variant="body2" mt={1} sx={{ color: '#666666' }}>
            항목별 지출액은 상황에 따라 변동될 수 있으며, 펀딩 성공률에 의해 항목별 금액에 비례하여 지출됩니다.
         </Typography>
      </Box>
   )

   const teamIntro = (
      <Box className="line">
         <SubTitle>팀소개</SubTitle>
         <Box mt={1}>
            <img
               src={process.env.REACT_APP_API_URL + funding.Studio.imgUrl}
               style={{
                  width: '180px',
                  height: '180px',
                  objectFit: 'cover',
                  borderRadius: '10px',
               }}
            />
         </Box>
         <Typography variant="h5">{funding.Studio.name}</Typography>
         <Typography>{funding.Studio.intro}</Typography>
      </Box>
   )

   const tablinks = [
      { name: '프로젝트 소개', section: content },
      { name: '선물 소개', section: gift },
      { name: '일정표', section: schedule },
      { name: '프로젝트 예산', section: budget },
      { name: '팀 소개', section: teamIntro },
   ]

   // 로딩 에러 처리
   if (loading) return <LoadingBox />
   if (error) return <ErrorBox error={error} open={errorOpen} setOpen={setErrorOpen} />

   return (
      <Grid2
         container
         sx={{
            flexDirection: {
               sm: 'row',
               xs: 'column-reverse',
            },
         }}
      >
         <Grid2
            size={{ sm: 9, xs: 12 }}
            sx={{
               '& .line': {
                  borderBottom: '1px solid #dddddd',
                  marginBottom: '8px',
                  paddingBottom: '16px',
               },
            }}
         >
            <TabLink links={tablinks}></TabLink>
         </Grid2>
         <Grid2 size={{ sm: 3, xs: 12 }}>
            <Typography sx={{ textAlign: 'left', color: '#666666', fontSize: '16px', fontWeight: 'bold', ml: 2 }}>선물 선택</Typography>
            {showReward()}
         </Grid2>
      </Grid2>
   )
}

export default FundingOverview
