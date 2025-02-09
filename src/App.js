import './styles/common.css'
import { Route, Routes, Link } from 'react-router-dom'
import { Button } from '@mui/material'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import StudioPage from './pages/StudioPage'
import CommunityPage from './pages/CommunityPage'
import CommunityWritePage from './pages/CommunityWritePage'
import FundingDetailPage from './pages/FundingDetailPage'
import FundingReview from './components/funding/FundingReview'
import DesignGuide from './pages/DesignGuide'

function App() {
   return (
      <>
         <Routes>
            <Route path="/desinguide" element={<DesignGuide />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
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
