import './styles/common.css'
import { Route, Routes, Link, useLocation } from 'react-router-dom'
import { Button } from '@mui/material'

import Home from './pages/Home'
import HotPage from './pages/list/HotPage'
import NewPage from './pages/list/NewPage'
import EndPage from './pages/list/EndPage'
import CommingPage from './pages/list/CommingPage'
import SearchPage from './pages/list/SearchPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import CommonSignupPage from './pages/CommonSignupPage'
import Navber from './components/shared/Navber'
import CommunityTab from './components/studio/CommunityTab'
import CommunityWritePage from './pages/CommunityWritePage'
import FundingReview from './components/funding/FundingReview'
import DesignGuide from './pages/DesignGuide'
import FundingLayout from './components/funding/FundingLayout'
import FundingTimeline from './components/funding/FundingTimeline'
import FundingOverview from './components/funding/FundingOverview'
import StudioLayout from './components/studio/StudioLayout'
import CommunityDetail from './components/community/CommunityDetail'

function App() {
   const location = useLocation()
   const pageName = {
      '/login': true,
      '/signup': true,
      '/commonsignup': true,
      '/studio': true,
      '/studio/community': true,
      '/studio/community/write': true,
      '/studio/community/:id': true,
   }

   const dontNeedNavber = pageName[location.pathname]

   return (
      <>
         {!dontNeedNavber && <Navber />}
         <Routes>
            <Route path="/desinguide" element={<DesignGuide />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/commonsignup" element={<CommonSignupPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/category/:id" element={<Home />} />
            <Route path="/hot" element={<HotPage />} />
            <Route path="/new" element={<NewPage />} />
            <Route path="/end" element={<EndPage />} />
            <Route path="/comming" element={<CommingPage />} />
            <Route path="/follow" element={<Home />} />
            <Route path="/studio" element={<StudioPage />}>
               <Route path="community" element={<CommunityTab />} />
               <Route path="community/write" element={<CommunityWritePage />} />
               <Route path="community/:id" element={<CommunityDetail />} />
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
