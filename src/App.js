import './styles/common.css'

import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import CommonSignupPage from './pages/CommonSignupPage'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/commonsignup' element={<CommonSignupPage />} />
      </Routes>
    </>
  )
}

export default App
