import { Route, Routes } from 'react-router-dom'
import './styles/common.css'
import CommunityPage from './pages/CommunityPage'
import StudioPage from './pages/StudioPage'

function App() {
   return (
      <Routes>
         <Route path="/studio" element={<StudioPage />} />
         <Route path="/studio/commu" element={<CommunityPage />} />
      </Routes>
   )
}

export default App
