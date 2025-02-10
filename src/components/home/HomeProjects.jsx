import ProjectCard from '../list/ProjectCard'
import { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { fetchShowProjectsThunk } from '../../features/listSlice'
import { Container } from '@mui/material'
import { SubTitle } from '../../styles/BaseStyles'

function HomeProjects() {
   const dispatch = useDispatch()
   const { projects, loading, error } = useSelector((state) => state.list)

   useEffect(() => {
      dispatch(fetchShowProjectsThunk({ type: 'all' }))
   }, [dispatch])

   const showCards = (type) => {
      let cards = []
      if (projects[type]) {
         cards = cards.concat(
            projects[type].map((project) => {
               return <ProjectCard key={project.id} d project={project} type={type} />
            })
         )
      }
      return cards
   }

   return (
      projects && (
         <>
            <SubTitle>인기 프로젝트</SubTitle>
            <Container
               disableGutters
               sx={{
                  display: {
                     xs: 'block',
                     sm: 'flex',
                  },
               }}
            >
               {showCards('hot')}
            </Container>
            <SubTitle>신규 프로젝트</SubTitle>
            <Container
               disableGutters
               sx={{
                  display: {
                     xs: 'block',
                     sm: 'flex',
                  },
               }}
            >
               {showCards('new')}
            </Container>
            <SubTitle>마감 임박</SubTitle>
            <Container
               disableGutters
               sx={{
                  display: {
                     xs: 'block',
                     sm: 'flex',
                  },
               }}
            >
               {showCards('end')}
            </Container>
            <SubTitle>공개 예정</SubTitle>
            <Container
               disableGutters
               sx={{
                  display: {
                     xs: 'block',
                     sm: 'flex',
                  },
               }}
            >
               {showCards('comming')}
            </Container>
         </>
      )
   )
}

export default HomeProjects
