import { Container } from '@mui/material'
import Banner from '../components/home/Banner'
import HomeProjects from '../components/home/HomeProjects'
import Navber from '../components/shared/Navber'

function Home() {
   return (
      <>
         <Navber />
         <Container maxWidth="md">
            <Banner />
            <img src="./images/rankBanner.png" alt="후원랭킹배너" width="100%" />
            <HomeProjects />
         </Container>
      </>
   )
}

export default Home
