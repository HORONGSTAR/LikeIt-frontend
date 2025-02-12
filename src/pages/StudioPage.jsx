import { useEffect } from 'react'
import { fetchStudioThunk } from '../features/studioSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardContent, CardMedia, Typography, Button, Divider } from '@mui/material'
import { Main, Stack2, LoadingBox } from '../styles/BaseStyles'
import StudioNavber from '../components/shared/StudioNavber'
import StudioTab from '../components/studio/StudioTab'

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
            {studio && (
               <>
                  <Card variant="none">
                     <CardMedia
                        sx={{ width: 180, height: 180, borderRadius: '10px' }}
                        image={process.env.REACT_APP_API_URL + '/studioImg' + studio.imgUrl}
                        alt="발레리나"
                     />
                     <CardContent>
                        <Stack2 mb={1} alignItems="end">
                           <Typography variant="h2" fontWeight="bold">
                              {studio.name}
                           </Typography>
                           <Button variant="contained">구독</Button>
                        </Stack2>
                        <Typography color="grey" sx={{ whiteSpace: 'pre-line' }}>
                           {studio.intro}
                        </Typography>
                        <Stack2 sx={{ mt: 'auto', gap: '0 10px' }}>
                           <Typography variant="body2">
                              달성 프로젝트 <Spen>3건</Spen>
                           </Typography>
                           <Divider orientation="vertical" variant="middle" flexItem />
                           <Typography>
                              구독자 수 <Spen>82명</Spen>
                           </Typography>
                           <Divider orientation="vertical" variant="middle" flexItem />
                           <Typography>
                              최대 달성률 <Spen>1125%</Spen>
                           </Typography>
                        </Stack2>
                     </CardContent>
                  </Card>
                  <StudioTab />
               </>
            )}
         </Main>
      </>
   )
}

export default StudioPage
