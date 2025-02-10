import { Container, Grid2, Stack, Typography } from '@mui/material'
import { Main } from '../styles/BaseStyles'
import Banner from '../components/home/Banner'
import HomeProjects from '../components/home/HomeProjects'

function Home() {
   return (
      <>
         <Main>
            <Banner />
            <img src="./images/rankBanner.png" alt="후원랭킹배너" width="100%" />
            <HomeProjects />
            <Grid2 container columnSpacing={1.5} rowSpacing={{ sm: 3, xs: 1.5 }}>
               {/* map돌릴땐 이 바로 아래 그리드2까지 포함해서 넣어주세요 */}
               <Grid2 size={{ md: 3, sm: 6, xs: 12 }}>{/* 카드 컴포넌트 넣는 자리 */}</Grid2>
            </Grid2>
         </Main>
      </>
   )
}

export default Home
