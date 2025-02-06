import './styles/common.css'
import MainPage from './pages/MainPage'
import Navber from './components/shared/Navber'
import { Routes, Route } from 'react-router-dom'

function App() {
   return (
      <>
         <Navber />
         <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/category/:id" element={<MainPage />} />
            <Route path="/hot" element={<MainPage />} />
            <Route path="/new" element={<MainPage />} />
            <Route path="/end" element={<MainPage />} />
            <Route path="/comming" element={<MainPage />} />
            <Route path="/follow" element={<MainPage />} />
         </Routes>
      </>
   )
}

export default App
