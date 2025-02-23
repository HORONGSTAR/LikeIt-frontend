import React from 'react'
import { useDispatch } from 'react-redux'
import { createCommunityThunk } from '../../../features/communitySlice'
import CommunityForm from './CommunityForm'
import { Main, LoadingBox, ErrorBox } from '../styles/BaseStyles'

function CommunityPage() {
   const { id } = useParams()
   const [open, setOpen] = useState(false)
   const { community, loading, error } = useSelector((state) => state.community)
   const dispatch = useDispatch()

   const handleCreateCommunity = useCallback(
      (communityData) => {
         if (id) {
            dispatch(createCommunityThunk(communityData))
               .unwrap()
               .then()
               .catch((err) => setOpen(true))
         } else {
            dispatch(createCommunityThunk(communityData))
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
      <Main>
         <CommunityForm initVals={community} onSubmit={handleCreateCommunity} />
         <ErrorBox error={error} open={open} setOpen={setOpen} />
      </Main>
   )
}

export default CommunityPage
