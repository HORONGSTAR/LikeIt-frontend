import My from '../components/my/My'
import { useDispatch, useSelector } from 'react-redux'
import { getProfileThunk } from '../features/pageSlice'
import { useEffect } from 'react'
import { LoadingBox, ErrorBox } from '../styles/BaseStyles'

const MyPage = () => {
   const dispatch = useDispatch()

   const { user, userWithOrders, points, loading, error } = useSelector((state) => state.page)

   useEffect(() => {
      dispatch(getProfileThunk())
   }, [dispatch])

   if (loading) return <p>로딩중</p>
   if (error) return <p>에러발생: {error}</p>

   return <My initialValues={user} userWithOrders={userWithOrders} points={points} />
}

export default MyPage
