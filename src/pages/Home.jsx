import { Grid2 } from '@mui/material'
import { Main } from '../styles/BaseStyles'
import Banner from '../components/home/Banner'
import HomeProjects from '../components/home/HomeProjects'
import { Link } from 'react-router-dom'

function Home() {
   return (
      <>
         <Main>
            <Banner />
            <Link to="/rank">
               <img src="./images/rankBanner.png" alt="후원랭킹배너" width="100%" />
            </Link>
            <HomeProjects />
         </Main>
      </>
   )
}

export default Home
