import { Container } from '@mui/material'

import Banner from '../components/home/Banner'
import HomeProjects from '../components/home/HomeProjects'

function Home() {
   return (
      <Container maxWidth="md">
         <Banner />
         <img src="./images/rankBanner.png" alt="후원랭킹배너" />
         <HomeProjects />
      </Container>
   )
}

export default Home
