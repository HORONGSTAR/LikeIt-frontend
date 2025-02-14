import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchStudioByIdThunk } from '../features/studioSlice'
import { useParams } from 'react-router-dom'
import StudioNavber from '../components/shared/StudioNavber'
import StudioLayout from '../components/studio/StudioLayout'
import StudioCreate from '../components/studio/StudioCreate'
import { Main } from '../styles/BaseStyles'
import { LoadingBox, ErrorBox } from '../styles/BaseStyles'

function StudioPage() {
   const { id } = useParams()
   const dispatch = useDispatch()
   const { studio, loading } = useSelector((state) => state.studio)

   useEffect(() => {
      dispatch(fetchStudioByIdThunk(id))
   }, [dispatch, id])

   if (loading) return <LoadingBox />

   if (!studio) {
      return <ErrorBox />
   }

   return (
      <>
         <StudioNavber />
         <Main>{studio ? <StudioLayout /> : <StudioCreate />}</Main>
      </>
   )
}

export default StudioPage
