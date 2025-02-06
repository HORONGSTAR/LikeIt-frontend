import './styles/common.css'

import Home from './pages/Home'
import MainPage from './pages/MainPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import Navber from './components/shared/Navber'
import { Routes, Route } from 'react-router-dom'

function App() {
   return (
      <>
         <Navber />
         <Routes>
            <Route path="/" element={<MainPage />} />
<Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
            <Route path="/category/:id" element={<MainPage />} />
            <Route path="/hot" element={<MainPage />} />
            <Route path="/new" element={<MainPage />} />
            <Route path="/end" element={<MainPage />} />
            <Route path="/comming" element={<MainPage />} />
            <Route path="/follow" element={<MainPage />} />
         </Routes>
      </>
   )

export default App
