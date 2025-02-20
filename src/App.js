import './styles/common.css'
import { Route, Routes, Link, useLocation } from 'react-router-dom'
import { Button, Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import RedirectLoginRoute from './components/auth/RedirectLoginRoute'
import RedirectLogoutRoute from './components/auth/RedirectLogoutRoute'
import AdminRoute from './components/auth/AdminRoute'

import Home from './pages/Home'
import AdminPage from './pages/AdminPage'
import Navber from './components/shared/Navber'
import StudioNavber from './components/shared/StudioNavber'
import Footer from './components/shared/Footer'

import HotPage from './pages/list/HotPage'
import NewPage from './pages/list/NewPage'
import EndPage from './pages/list/EndPage'
import CommingPage from './pages/list/CommingPage'
import SearchPage from './pages/list/SearchPage'
import FollowPage from './pages/list/FollowPage'
import CategoryPage from './pages/list/CategoryPage'

import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import CommonSignupPage from './pages/CommonSignupPage'
import FindingPasswordPage from './pages/FindingPasswordPage'

import FundingReview from './components/funding/FundingReview'
import FundingLayout from './components/funding/FundingLayout'
import FundingTimeline from './components/funding/FundingTimeline'
import FundingOverview from './components/funding/FundingOverview'

import RankingPage from './pages/RankingPage'
import AdditionalSignupPage from './pages/AdditionalSignupPage'

import StudioPage from './pages/StudioPage'
import StudioProfilePage from './pages/StudioProfilePage'
import ProjectWritePage from './pages/ProjectWritePage'

import { checkAuthStatusThunk } from './features/authSlice'
import MyPage from './pages/MyPage'

import DesignGuide from './pages/DesignGuide'
import MemberPage from './pages/MemberPage'
import CommunityForm from './components/studio/community/CommunityForm'
import CreatorPage from './pages/CreatorPage'

function App() {
   const location = useLocation()
   const path = location.pathname.split('/')
   const pageName = {
      login: true,
      signup: true,
      commonsignup: true,
      studio: <StudioNavber />,
      '/studio/project/write': true,
   }

   const dontNeedNavber = pageName[path[1]]
   const needBackground = pageName[location.pathname]

   const dispatch = useDispatch()
   const { isAuthenticated, user } = useSelector((state) => state.auth)

   useEffect(() => {
      dispatch(checkAuthStatusThunk())
   }, [dispatch])

   return (
      <Box sx={{ background: needBackground && '#eee' }}>
         {dontNeedNavber || <Navber isAuthenticated={isAuthenticated} user={user} />}
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
            <Route path="/findingpassword" element={<FindingPasswordPage />} />
            <Route path="/my" element={<MyPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/category/:id" element={<CategoryPage />} />
            <Route path="/hot" element={<HotPage />} />
            <Route path="/new" element={<NewPage />} />
            <Route path="/end" element={<EndPage />} />
            <Route path="/comming" element={<CommingPage />} />
            <Route path="/follow" element={<Home />} />

            <Route path="/studio" element={<StudioPage />} />
            <Route path="/studio/:id" element={<StudioPage />} />
            <Route path="/studio/project/write" element={<ProjectWritePage />} />
            <Route path="/studio/project/edit/:id" element={<ProjectWritePage />} />
            <Route path="/studio/profile" element={<StudioProfilePage />} />
            <Route path="/studio/profile/:id" element={<StudioProfilePage />} />
            <Route path="/studio/member" element={<MemberPage />} />
            <Route path="/community/write" element={<CommunityForm />} />

            <Route path="/funding" element={<FundingLayout />}>
               <Route path="detail" element={<FundingOverview />} />
               <Route path="timeline" element={<FundingTimeline />} />
               <Route path="review" element={<FundingReview />} />
            </Route>

            <Route path="/creator" element={<CreatorPage />} />

            <Route path="/follow" element={<FollowPage />} />
            <Route path="/additionalsignup" element={<AdditionalSignupPage />} />
         </Routes>
         <Button component={Link} sx={{ position: 'fixed', right: 10, bottom: 10 }} variant="contained" to="/desinguide">
            디자인 가이드 확인하기
         </Button>
         <Footer></Footer>
      </Box>
   )
}
export default App
