import './styles/common.css'
import Home from './pages/Home'
import HotPage from './pages/list/HotPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import CommonSignupPage from './pages/CommonSignupPage'
import Navber from './components/shared/Navber'

import { Routes, Route, useLocation } from 'react-router-dom'

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
            <Route path="/" element={<Home />} />
            <Route path="/list/hot" element={<HotPages />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/commonsignup" element={<CommonSignupPage />} />
         </Routes>
      </>
   )
}

export default App
