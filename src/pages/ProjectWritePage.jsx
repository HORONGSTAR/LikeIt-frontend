import { useCallback, useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { createProjectThunk, updateProjectThunk, fetchProjectByIdThunk } from '../features/projectSlice'
import { fetchRewardThunk } from '../features/rewardSlice'
import { InputBase, Box, Button, Stack, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Main, Dot, LoadingBox, ErrorBox } from '../styles/BaseStyles'
import ProjectFormTab from '../components/project/ProjectFormTab'

function ProjectWritePage() {
   const step = useRef(0)
   const { id } = useParams()
   const [open, setOpen] = useState(false)
   const [title, setTitle] = useState('')
   const { project, loading, error } = useSelector((state) => state.project)

   const dispatch = useDispatch()
   const navigate = useNavigate()

   const handleCreateProject = useCallback(() => {
      dispatch(createProjectThunk({ title }))
         .unwrap()
         .then((result) => {
            navigate(`/studio/project/edit/${result.project.id}`)
         })
         .catch(() => {})
   }, [dispatch, navigate, title])

   const handleEditProject = useCallback(
      (projectData) => {
         dispatch(updateProjectThunk({ projectId: id, projectData }))
      },
      [dispatch, id]
   )

   useEffect(() => {
      if (!id) return
      dispatch(fetchProjectByIdThunk(id))
   }, [dispatch, id])

   if (loading) return <LoadingBox />

   const firstStep = (
      <Stack alignItems="center" py={6} spacing={4}>
         <Box component="img" src="/images/logoEgg.svg" alt="로고이미지" className="project-write-img" />
         <Stack spacing={1} alignItems="center">
            <Dot both>
               <Typography fontWeight={500}>새로운 프로젝트의 제목을 지어주세요!</Typography>
            </Dot>
            <Box sx={{ border: '2px solid #ddd', borderRadius: 6, py: 1, px: 3 }}>
               <InputBase autoFocus value={title} onChange={(e) => setTitle(e.target.value)} />
            </Box>
            <Typography variant="caption" color="grey">
               프로젝트 제목은 시작 후에도 수정할 수 있어요.
            </Typography>
         </Stack>
         <Button variant="yellow" size="large" onClick={handleCreateProject}>
            시작하기
         </Button>
      </Stack>
   )

   return (
      <>
         <Main>{id ? <ProjectFormTab onSubmit={handleEditProject} step={step} project={project} /> : firstStep}</Main>
         <ErrorBox error={error} open={open} setOpen={setOpen} />
      </>
   )
}

export default ProjectWritePage
