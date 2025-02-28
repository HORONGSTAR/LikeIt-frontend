import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Notice from '../components/my/Notice'
import { Main } from '../styles/BaseStyles'

function NoticePage() {
   const dispatch = useDispatch()
   const { id } = useParams()
   const { user } = useSelector((state) => state.auth)

   return user ? <Notice /> : <Main>로그인이 필요한 페이지입니다.</Main>
}

export default NoticePage
