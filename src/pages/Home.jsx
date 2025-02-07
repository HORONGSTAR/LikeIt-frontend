import { Container } from '@mui/material'
import { ImgBox } from '../styles/StyledComponent'
import Banner from '../components/home/Banner'
import HomeProjects from '../components/home/HomeProjects'

function Home() {
   return (
      <Container maxWidth="md">
         <Banner />
         <ImgBox src="./images/rankBanner.png" alt="후원랭킹배너" width="100%" />
         <HomeProjects />
      </Container>
   )
}

export default Home
