import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { fetchShowProjectsThunk } from '../../features/mainSlice'

function HomeProjects() {
   const dispatch = useDispatch()
   const { projects, pagination, loading, error } = useSelector((state) => state.main)

   useEffect(() => {
      dispatch(fetchShowProjectsThunk('all'))
   }, [dispatch])

   return <></>
}

export default HomeProjects
