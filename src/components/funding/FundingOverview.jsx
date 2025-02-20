import { Box, Grid2, Typography } from '@mui/material'
import { SubTitle } from '../../styles/BaseStyles'
import { TabLink } from '../../components/ui/Tabs'

function FundingOverview({ funding }) {
   const showRewards = () => {
      const productSet = new Set()
      let productInfo = []

      return (
         <>
            {funding.Rewards.map((reward) => (
               <Box
                  p={1}
                  m={1}
                  key={reward.id}
                  sx={{
                     border: '1px solid #dddddd',
                  }}
               >
                  <Typography variant="h5">{reward.name}</Typography>
                  <Typography variant="body2">{reward.contents}</Typography>
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
                              p={1}
                              key={product.id}
                           >
                              <img
                                 src={process.env.REACT_APP_API_URL + '/rewardProduct' + product.imgUrl}
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
            <Typography variant="h5">선물 구성품</Typography>
            <Grid2
               container
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

   const content = (
      <div className="line">
         <SubTitle>프로젝트 소개</SubTitle>
         <p>{funding.contents}</p>
      </div>
   )

   const gift = (
      <div className="line">
         <SubTitle>선물 소개</SubTitle>
         {showRewards()}
      </div>
   )

   const schedule = (
      <div className="line">
         <SubTitle>일정표</SubTitle>
         {funding.schedule}
      </div>
   )
   const budget = (
      <div className="line">
         <SubTitle>프로젝트 예산</SubTitle>
         {showBudget()}
         <Typography variant="body2">항목별 지출액은 상황에 따라 변동될 수 있으며, 펀딩 성공률에 의해 항목별 금액에 비례하여 지출됩니다.</Typography>
      </div>
   )
   const teamIntro = (
      <div className="line">
         <SubTitle>팀소개</SubTitle>
         <img
            src={process.env.REACT_APP_API_URL + '/studioImg' + funding.Studio.imgUrl}
            style={{
               width: '100%',
               height: '180px',
               objectFit: 'cover',
               borderRadius: '10px',
            }}
         />
         <Typography variant="h5">{funding.Studio.name}</Typography>
         <Typography>{funding.Studio.intro}</Typography>
      </div>
   )

   const tablinks = [
      { name: '프로젝트 소개', section: content },
      { name: '선물 소개', section: gift },
      { name: '일정표', section: schedule },
      { name: '프로젝트 예산', section: budget },
      { name: '팀 소개', section: teamIntro },
   ]

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
            <p>리워드영역</p>
         </Grid2>
      </Grid2>
   )
}

export default FundingOverview
