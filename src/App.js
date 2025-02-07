import { Route, Routes } from 'react-router-dom'
import './styles/common.css'
import CommunityPage from './pages/CommunityPage'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import Navber from './components/shared/Navber'
import StudioNavber from './components/shared/StudioNavber'
import StudioPage from './pages/StudioPage'

function App() {
   return (
      <>
         <StudioNavber />
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
            <Route path="/studio" element={<StudioPage />} />
            <Route path="/studio/commu" element={<CommunityPage />} />
         </Routes>
      </>
   )
}
export default App
