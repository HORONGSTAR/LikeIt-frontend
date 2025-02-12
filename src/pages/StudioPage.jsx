import { useEffect } from 'react'
import { fetchStudioThunk } from '../features/studioSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardContent, CardMedia, Typography, Button, Divider, Box } from '@mui/material'
import { Main, Stack2, LoadingBox, Ellipsis } from '../styles/BaseStyles'
import StudioNavber from '../components/shared/StudioNavber'
import StudioLayout from '../components/studio/StudioLayout'

const StudioPage = () => {
   const dispatch = useDispatch()
   const { studio, lodding, error } = useSelector((state) => state.studio)

   useEffect(() => {
      dispatch(fetchStudioThunk())
   }, [dispatch])

   const Spen = (props) => <Typography component="span" color="green" variant="body2" {...props} />

   if (lodding) return <LoadingBox />

   return (
      <>
         <StudioNavber />
         <Main>
            <StudioLayout />
         </Main>
      </>
   )
}

export default StudioPage
