import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchStudioThunk } from '../features/studioSlice'

import StudioNavber from '../components/shared/StudioNavber'
import StudioLayout from '../components/studio/StudioLayout'
import StudioCreate from '../components/studio/StudioCreate'
import { Main } from '../styles/BaseStyles'
import { LoadingBox } from '../styles/BaseStyles'

function StudioPage() {
   const dispatch = useDispatch()
   const { studio, loading } = useSelector((state) => state.studio)
   const { user } = useSelector((state) => state.auth)

   useEffect(() => {
      if (user?.id) {
         dispatch(fetchStudioThunk(user.id))
      }
   }, [dispatch, user])

   if (loading) return <LoadingBox />

   return (
      <>
         <StudioNavber />
         <Main>{studio ? <StudioLayout /> : <StudioCreate />}</Main>
      </>
   )
}

export default StudioPage
