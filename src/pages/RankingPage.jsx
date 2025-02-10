import { Typography } from '@mui/material'
import { Main } from '../styles/BaseStyles'

function RankingPage() {
   return (
      <Main>
         <img src="./images/rankBanner2.png" alt="후원랭킹배너" width="100%" style={{ margin: '20px 0' }} />
         <Typography variant="h4">후기 최다 작성자</Typography>
         <Typography variant="h4">최다 후원자</Typography>
         <Typography variant="h4">최고 후원자</Typography>
      </Main>
   )
}

export default RankingPage
