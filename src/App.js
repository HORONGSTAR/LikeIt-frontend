import './styles/common.css'
import Home from './pages/Home'
import HotPage from './pages/list/HotPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import CommonSignupPage from './pages/CommonSignupPage'
import Navber from './components/shared/Navber'

import { Routes, Route } from 'react-router-dom'

function App() {
   return (
      <>
         <Navber />
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/list/hot" element={<HotPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/commonsignup" element={<CommonSignupPage />} />
         </Routes>
      </>
   )
}

export default App
