import './styles/common.css'
import { Route, Routes, Link, useLocation } from 'react-router-dom'
import { Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import RedirectLoginRoute from './components/auth/RedirectLoginRoute'
import RedirectLogoutRoute from './components/auth/RedirectLogoutRoute'
import AdminRoute from './components/auth/AdminRoute'

import Home from './pages/Home'
import AdminPage from './pages/AdminPage'

import HotPage from './pages/list/HotPage'
import NewPage from './pages/list/NewPage'
import EndPage from './pages/list/EndPage'
import CommingPage from './pages/list/CommingPage'
import SearchPage from './pages/list/SearchPage'
import FollowPage from './pages/list/FollowPage'
import CategoryPage from './pages/list/CategoryPage'

import StudioPage from './pages/StudioPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import CommonSignupPage from './pages/CommonSignupPage'
import FindingPasswordPage from './pages/FindingPasswordPage'
import Navber from './components/shared/Navber'
import CommunityTab from './components/studio/CommunityTab'
import CommunityWritePage from './pages/CommunityWritePage'
import FundingReview from './components/funding/FundingReview'
import DesignGuide from './pages/DesignGuide'
import RankingPage from './pages/RankingPage'
import AdditionalSignupPage from './pages/AdditionalSignupPage'
import { checkAuthStatusThunk } from './features/authSlice'
import MyPage from './pages/MyPage'

function App() {
   const location = useLocation()
   const pageName = {
      '/login': true,
      '/signup': true,
      '/commonsignup': true,
      '/studio': true,
      '/findingpassword': true,
   }

   const dontNeedNavber = pageName[location.pathname]

   const dispatch = useDispatch()
   const { isAuthenticated, user } = useSelector((state) => state.auth)

   useEffect(() => {
      dispatch(checkAuthStatusThunk())
   }, [dispatch])

   return (
      <>
         {!dontNeedNavber && <Navber isAuthenticated={isAuthenticated} user={user} />}
         <Routes>
            <Route
               path="/admin"
               element={
                  <AdminRoute>
                     <AdminPage />
                  </AdminRoute>
               }
            />
            <Route path="/desinguide" element={<DesignGuide />} />
            <Route path="/" element={<Home />} />
            <Route path="/rank" element={<RankingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/commonsignup" element={<CommonSignupPage />} />
            <Route path="/findingpassword" element={<FindingPasswordPage />} />
            <Route path="/my" element={<MyPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/category/:id" element={<CategoryPage />} />
            <Route path="/hot" element={<HotPage />} />
            <Route path="/new" element={<NewPage />} />
            <Route path="/end" element={<EndPage />} />
            <Route path="/comming" element={<CommingPage />} />
            <Route path="/follow" element={<FollowPage />} />
            <Route path="/studio" element={<StudioPage />} />
            {/* <Route path="commu" element={<CommunityPage />} /> */}
            <Route path="/additionalsignup" element={<AdditionalSignupPage />} />
            <Route path="/studio/commu/write" element={<CommunityWritePage />} />

            {/* <Route path="/funding" element={<FundingLayout />}> */}
            {/* <Route path="detail" element={<FundingOverview />} /> */}
            {/* <Route path="timeline" element={<FundingTimeline />} /> */}
            {/* <Route path="review" element={<FundingReview />} />
            </Route> */}
         </Routes>
         <Button component={Link} sx={{ position: 'fixed', right: 10, bottom: 10 }} variant="contained" to="/desinguide">
            디자인 가이드 확인하기
         </Button>
         {user && user.role === 'ADMIN' && (
            <Button component={Link} sx={{ position: 'fixed', right: 10, bottom: 50 }} variant="contained" to="/admin">
               관리자 페이지
            </Button>
         )}
      </>
   )
}
export default App
