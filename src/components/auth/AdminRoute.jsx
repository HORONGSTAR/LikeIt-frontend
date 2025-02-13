import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function AdminRoute({ children }) {
   const { isAuthenticated, user, loading } = useSelector((state) => state.auth)

   // 로딩 중일 때는 아무것도 렌더링하지 않음
   if (loading) {
      return null
   }

   // 인증되지 않았거나 관리자가 아닐 경우 리다이렉트
   if (!isAuthenticated || user?.role !== 'ADMIN') {
      alert('접근 권한이 없습니다!')
      return <Navigate to="/" /> // 홈 페이지로 리다이렉트
   }

   // 인증된 관리자만 접근 가능
   return children
}

export default AdminRoute
