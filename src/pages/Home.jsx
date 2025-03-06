import { Box } from '@mui/material'
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
               <Box component="img" src="./images/rankBanner.svg" alt="후원랭킹배너" sx={{ borderRadius: 2.5, width: '100%', boxShadow: '0px 2px 4px rgba(0,0,0,0.25)' }} />
            </Link>
            <HomeProjects />
         </Main>
      </>
   )
}

export default Home
