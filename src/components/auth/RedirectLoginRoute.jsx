import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { LoadingBox } from '../../styles/BaseStyles'

function RedirectLoginRoute({ children }) {
   const { isAuthenticated, loading } = useSelector((state) => state.auth)

   // 로딩 중일 때는 아무것도 렌더링하지 않음
   if (loading) {
      return <LoadingBox /> // 로딩 화면 표시 (필요에 따라 커스터마이징 가능)
   }

   // 로그인 상태일 경우, 홈으로 리다이렉트
   if (isAuthenticated) {
      return <Navigate to="/" />
   }

   // 로그인 상태가 아니면 children 컴포넌트 렌더링
   return children
}

export default RedirectLoginRoute
