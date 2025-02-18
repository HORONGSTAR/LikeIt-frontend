import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createProjectThunk, updateProjectThunk, fetchProjectByIdThunk } from '../features/projectSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Main, LoadingBox, ErrorBox } from '../styles/BaseStyles'
import ProjectFormTab from '../components/project/ProjectFormTab'

function ProjectWritePage() {
   const { id } = useParams()
   const [open, setOpen] = useState(false)
   const { project, loading, error } = useSelector((state) => state.project)

   const dispatch = useDispatch()

   const handleSubmit = useCallback(
      (projectData) => {
         if (id) {
            dispatch(updateProjectThunk({ projectId: id, projectData }))
         } else {
            dispatch(createProjectThunk(projectData))
         }
      },
      [dispatch, id]
   )

   useEffect(() => {
      if (id) dispatch(fetchProjectByIdThunk(id))
   }, [dispatch, id])

   if (loading) return <LoadingBox />

   return (
      <>
         <Main>
            <ProjectFormTab project={project} onSubmit={handleSubmit} />
         </Main>
         <ErrorBox error={error} open={open} setOpen={setOpen} />
      </>
   )
}

export default ProjectWritePage
