import { useCallback, useEffect, useState } from 'react'
import StudioNavber from '../components/shared/StudioNavber'
import { useParams } from 'react-router-dom'
import { fetchStudioByIdThunk, createStudioThunk, updateStudioThunk } from '../features/studioSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Main, LoadingBox, ErrorBox } from '../styles/BaseStyles'
import { Typography } from '@mui/material'
import StudioForm from '../components/studio/StudioForm'

function StudioProfilePage() {
   const { id } = useParams()
   const [open, setOpen] = useState(false)
   const { studio, loading, error } = useSelector((state) => state.studio)
   const dispatch = useDispatch()

   const handleSubmit = useCallback(
      (studioData) => {
         if (id) {
            dispatch(updateStudioThunk({ studioId: id, studioData }))
               .unwrap()
               .then()
               .catch((err) => setOpen(true))
         } else {
            dispatch(createStudioThunk(studioData))
               .unwrap()
               .then()
               .catch((err) => setOpen(true))
         }
      },
      [dispatch]
   )

   useEffect(() => {
      if (id) dispatch(fetchStudioByIdThunk(id))
   }, [dispatch, id])

   if (loading) return <LoadingBox />

   return (
      <>
         <StudioNavber />
         <Main>
            <Typography variant="h4" color="orenge" py={3}>
               {id ? '스튜디오 프로필 수정하기' : '스튜디오 만들기'}
            </Typography>
            <StudioForm initVals={studio} onSubmit={handleSubmit} />
         </Main>
         <ErrorBox error={error} open={open} setOpen={setOpen} />
      </>
   )
}

export default StudioProfilePage
