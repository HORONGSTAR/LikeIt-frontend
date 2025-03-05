import My from '../components/my/My'
import { useDispatch, useSelector } from 'react-redux'
import { getProfileThunk } from '../features/pageSlice'
import { useEffect } from 'react'
import { LoadingBox, ErrorBox } from '../styles/BaseStyles'
import { Typography } from '@mui/material'

const MyPage = () => {
   const dispatch = useDispatch()

   const { user, orders, points, profits, allprojects, loading, error } = useSelector((state) => state.page)

   useEffect(() => {
      dispatch(getProfileThunk())
   }, [dispatch])

   if (loading)
      return (
         <>
            <LoadingBox />
         </>
      )
   if (error)
      return (
         <Typography variant="h4" sx={{ color: 'red', textAlign: 'center', my: 5 }}>
            {error}
         </Typography>
      )

   return <My initialValues={user} orders={orders} points={points} profits={profits} allprojects={allprojects} />
}

export default MyPage
