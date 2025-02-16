import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchStudioByIdThunk, fetchStudioThunk } from '../features/studioSlice'
import { useParams } from 'react-router-dom'
import StudioNavber from '../components/shared/StudioNavber'
import StudioLayout from '../components/studio/StudioLayout'
import StudioCreate from '../components/studio/StudioCreate'
import { Main } from '../styles/BaseStyles'
import { LoadingBox, ErrorBox } from '../styles/BaseStyles'

function StudioPage() {
   const { id } = useParams()
   const [open, setOpen] = useState(false)
   const dispatch = useDispatch()
   const { studio, loading, error } = useSelector((state) => state.studio)

   const handleFetchStudio = useCallback(() => {
      if (id) dispatch(fetchStudioByIdThunk(id))
      else dispatch(fetchStudioThunk())
   }, [id, dispatch])

   useEffect(() => {
      handleFetchStudio()
   }, [handleFetchStudio])

   if (loading) return <LoadingBox />

   return (
      <>
         <StudioNavber />
         <Main>{studio ? <StudioLayout /> : <StudioCreate />}</Main>
         <ErrorBox error={error} />
      </>
   )
}

export default StudioPage
