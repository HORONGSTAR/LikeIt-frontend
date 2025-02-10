import './styles/common.css'
import { Route, Routes, Link, useLocation } from 'react-router-dom'
import { Button } from '@mui/material'
import Home from './pages/Home'
import HotPage from './pages/list/HotPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import CommonSignupPage from './pages/CommonSignupPage'
import Navber from './components/shared/Navber'
import CommunityTab from './components/studio/CommunityTab'
import CommunityWritePage from './pages/CommunityWritePage'
import FundingReview from './components/funding/FundingReview'
<<<<<<< HEAD
import DesignGuide from './pages/DesignGuide'
import FundingLayout from './components/funding/FundingLayout'
import FundingTimeline from './components/funding/FundingTimeline'
import FundingOverview from './components/funding/FundingOverview'
import StudioLayout from './components/studio/StudioLayout'

function App() {
   const location = useLocation()
   const pageName = { '/login': true, '/signup': true, '/commonsignup': true, '/studio': true, '/studio/commu': true, '/studio/commu/write': true }
=======
import FundingTimeline from './components/funding/FundingTimeline'
import FundingLayout from './components/funding/FundingLayout'
import DesignGuide from './pages/DesignGuide'

function App() {
   const location = useLocation()
   const pageName = { '/login': true, '/signup': true, '/commonsignup': true, '/studio': true }
>>>>>>> ad11d9da0d70b8f1e8c2b435f4f68e065d142ab5
   const dontNeedNavber = pageName[location.pathname]

   return (
      <>
         {!dontNeedNavber && <Navber />}
         <Routes>
            <Route path="/desinguide" element={<DesignGuide />} />
            <Route path="/" element={<Home />} />
            <Route path="/list/hot" element={<HotPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/commonsignup" element={<CommonSignupPage />} />
            <Route path="/category/:id" element={<Home />} />
            <Route path="/hot" element={<Home />} />
            <Route path="/new" element={<Home />} />
            <Route path="/end" element={<Home />} />
            <Route path="/comming" element={<Home />} />
            <Route path="/follow" element={<Home />} />
            <Route path="/studio" element={<StudioLayout />}>
               <Route path="commu" element={<CommunityTab />} />
               <Route path="commu/write" element={<CommunityWritePage />} />
            </Route>
            <Route path="/funding" element={<FundingLayout />}>
               <Route path="detail" element={<FundingOverview />} />
               <Route path="timeline" element={<FundingTimeline />} />
               <Route path="review" element={<FundingReview />} />
            </Route>
         </Routes>
         <Button component={Link} sx={{ position: 'fixed', right: 10, bottom: 10 }} variant="contained" to="/desinguide">
            디자인 가이드 확인하기
         </Button>
      </>
   )
}
export default App
