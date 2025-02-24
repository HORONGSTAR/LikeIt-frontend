import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchStudioByIdThunk, fetchStudioThunk } from '../features/studioSlice'
import { useParams, useNavigate } from 'react-router-dom'
import StudioLayout from '../components/studio/StudioLayout'
import { Typography, Button, Box } from '@mui/material'
import { LoadingBox, ErrorBox, Main } from '../styles/BaseStyles'

function StudioPage() {
   const { id } = useParams()
   const [open, setOpen] = useState(false)
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { studio, loading, error } = useSelector((state) => state.studio)

   const handleFetchStudio = useCallback(() => {
      if (id)
         dispatch(fetchStudioByIdThunk(id))
            .unwrap()
            .then()
            .catch((err) => setOpen(true))
      else
         dispatch(fetchStudioThunk())
            .unwrap()
            .then()
            .catch((err) => setOpen(true))
   }, [id, dispatch])

   useEffect(() => {
      handleFetchStudio()
   }, [handleFetchStudio])

   if (loading) return <LoadingBox />

   const newStudio = (
      <>
         <Box>
            <Typography variant="h4" sx={{ color: '#666', mt: 6, fontSize: '24px', textAlign: 'center' }}>
               스튜디오가 없습니다. 새로 만들까요?
            </Typography>
         </Box>

         <Button
            variant="yellow"
            sx={{ color: 'white', height: '50px', fontSize: '24px' }}
            onClick={() => navigate('/studio/profile')}
         >
            스튜디오 만들기
         </Button>

         <Box>
            <img src="/images/142.png" alt="스튜디오 생성" style={{ width: '100%' }} />
         </Box>
      </>
   )

   return (
      <>
         <Main>{studio ? <StudioLayout /> : newStudio}</Main>

         <ErrorBox error={error} open={open} setOpen={setOpen} />
      </>
   )
}

export default StudioPage
