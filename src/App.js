import { Route, Routes } from 'react-router-dom'
import './styles/common.css'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import Navber from './components/shared/Navber'
import StudioPage from './pages/StudioPage'
import CommunityPage from './pages/CommunityPage'
import CommunityWritePage from './pages/CommunityWritePage'
import FundingDetailPage from './pages/FundingDetailPage'
import FundingReview from './components/funding/FundingReview'

function App() {
   return (
      <>
         <Navber />
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/category/:id" element={<Home />} />
            <Route path="/hot" element={<Home />} />
            <Route path="/new" element={<Home />} />
            <Route path="/end" element={<Home />} />
            <Route path="/comming" element={<Home />} />
            <Route path="/follow" element={<Home />} />
            <Route path="/studio" element={<StudioPage />}>
               <Route path="commu" element={<CommunityPage />} />
            </Route>
            <Route path="/studio/commu/write" element={<CommunityWritePage />} />
            <Route path="/funding/detail" element={<FundingDetailPage />} />
            <Route path="/funding/review" element={<FundingReview />} />
         </Routes>
      </>
   )
}
export default App
