import './styles/common.css'
import { useEffect } from 'react'
import { Route, Routes, Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuthStatusThunk } from './features/authSlice'
import { Button } from '@mui/material'

//shared
import Navber from './components/shared/Navber'
import StudioNavber from './components/shared/StudioNavber'
import Footer from './components/shared/Footer'

// main
import Home from './pages/Home'
import HotPage from './pages/list/HotPage'
import NewPage from './pages/list/NewPage'
import EndPage from './pages/list/EndPage'
import CommingPage from './pages/list/CommingPage'
import SearchPage from './pages/list/SearchPage'
import FollowPage from './pages/list/FollowPage'
import CategoryPage from './pages/list/CategoryPage'
import RankingPage from './pages/RankingPage'

// auth
import RedirectLoginRoute from './components/auth/RedirectLoginRoute'
import RedirectLogoutRoute from './components/auth/RedirectLogoutRoute'
import AdminRoute from './components/auth/AdminRoute'
import AdminPage from './pages/AdminPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import CommonSignupPage from './pages/CommonSignupPage'
import FindingPasswordPage from './pages/FindingPasswordPage'
import FindingEmailPage from './pages/FindingEmailPage'
import MyPage from './pages/MyPage'
import NoticePage from './pages/NoticePage'

//studio
import StudioPage from './pages/StudioPage'
import AdditionalSignupPage from './pages/AdditionalSignupPage'
import StudioProfilePage from './pages/StudioProfilePage'
import ProjectWritePage from './pages/ProjectWritePage'
import CommunityForm from './components/studio/community/CommunityForm'
import MemberPage from './pages/MemberPage'
import ProjectAllPage from './pages/ProjectAllPage'

// fundingDetail - creator
import CreatorPage from './pages/CreatorPage'

// fundingDetail - user
import FundingDetailPage from './pages/FundingDetailPage'
import FundingOrderPage from './pages/FundingOrderPage'

// develop
import DesignGuide from './pages/DesignGuide'

function App() {
   const path = useLocation().pathname.split('/')
   const pageName = {
      login: true,
      signup: true,
      findingpassword: true,
      findingemail: true,
      commonsignup: true,
      studio: <StudioNavber />,
   }
   const dontNeedNavber = pageName[path[1]]

   const dispatch = useDispatch()
   const { isAuthenticated, user } = useSelector((state) => state.auth)

   useEffect(() => {
      dispatch(checkAuthStatusThunk())
   }, [dispatch])

   return (
      <>
         {dontNeedNavber || <Navber isAuthenticated={isAuthenticated} user={user} />}
         <Routes>
            {/* main */}
            <Route path="/" element={<Home />} />
            <Route path="/hot" element={<HotPage />} />
            <Route path="/new" element={<NewPage />} />
            <Route path="/end" element={<EndPage />} />
            <Route path="/comming" element={<CommingPage />} />
            <Route path="/follow" element={<FollowPage />} />
            <Route path="/category/:id" element={<CategoryPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/rank" element={<RankingPage />} />
            <Route path="/admin" element={<AdminPage />} />

            {/* auth */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/commonsignup" element={<CommonSignupPage />} />
            <Route path="/findingpassword" element={<FindingPasswordPage />} />
            <Route path="/findingemail" element={<FindingEmailPage />} />
            <Route path="/additionalsignup" element={<AdditionalSignupPage />} />
            <Route path="/my" element={<MyPage />} />
            <Route path="/notice" element={<NoticePage />} />

            {/* studio */}
            <Route path="/studio" element={<StudioPage />} />
            <Route path="/studio/:id" element={<StudioPage />} />
            <Route path="/studio/project/create" element={<ProjectWritePage />} />
            <Route path="/studio/project/edit/:id" element={<ProjectWritePage />} />
            <Route path="/studio/project/all" element={<ProjectAllPage />} />
            <Route path="/studio/profile" element={<StudioProfilePage />} />
            <Route path="/studio/profile/:id" element={<StudioProfilePage />} />
            <Route path="/studio/member" element={<MemberPage />} />
            <Route path="/studio/community/write" element={<CommunityForm />} />

            {/* fundingDetail - creator */}
            <Route path="/creator" element={<CreatorPage />} />

            {/* fundingDetail - user */}
            <Route path="/funding/:id" element={<FundingDetailPage />} />

            <Route
               path="/funding/order/:id"
               element={
                  <RedirectLogoutRoute>
                     <FundingOrderPage />
                  </RedirectLogoutRoute>
               }
            />
            {/* develop */}
            <Route path="/desinguide" element={<DesignGuide />} />
         </Routes>

         {/* admin */}
         {user && user.role === 'ADMIN' && (
            <Button component={Link} sx={{ position: 'fixed', right: 10, bottom: 50 }} variant="contained" to="/admin">
               관리자 페이지
            </Button>
         )}

         <Button component={Link} sx={{ position: 'fixed', right: 10, bottom: 10 }} variant="contained" to="/desinguide">
            디자인 가이드 확인하기
         </Button>

         <Footer />
      </>
   )
}
export default App
