import './styles/common.css'
import { Route, Routes, Link } from 'react-router-dom'
import { Button } from '@mui/material'
import Home from './pages/Home'
import HotPage from './pages/list/HotPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import CommonSignupPage from './pages/CommonSignupPage'
import Navber from './components/shared/Navber'
import { Routes, Route, useLocation } from 'react-router-dom'
import StudioPage from './pages/StudioPage'
import CommunityPage from './pages/CommunityPage'
import CommunityWritePage from './pages/CommunityWritePage'
import FundingDetailPage from './pages/FundingDetailPage'
import FundingReview from './components/funding/FundingReview'
import DesignGuide from './pages/DesignGuide'

function App() {
   const location = useLocation()
   // Check if the current path is "/login" or "/signup"
   const dontNeedNavber = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/commonsignup'
   // 로그인 이랑 회원가입부분이 네브바가 필요가 없어서 요렇게 했습니다 ㅠ
   // navber가 필요없는 화면은 위에 형식처럼해서 path 경로만 넣어주시면 됩니다!!! - 세빈

   return (
      <>
         {/* <Navber /> */}
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
            <Route path="/studio" element={<StudioPage />} />
            <Route path="commu" element={<CommunityPage />} />
            <Route path="/studio/commu/write" element={<CommunityWritePage />} />
            <Route path="/funding/detail" element={<FundingDetailPage />} />
            <Route path="/funding/review" element={<FundingReview />} />
         </Routes>
         <Button component={Link} sx={{ position: 'fixed', right: 10, bottom: 10 }} variant="contained" to="/desinguide">
            디자인 가이드 확인하기
         </Button>
      </>
   )
}
export default App
