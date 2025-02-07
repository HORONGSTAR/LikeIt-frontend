import ProjectCard from '../list/ProjectCard'

import { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { fetchShowProjectsThunk } from '../../features/listSlice'
import { Container } from '@mui/material'

function HomeProjects() {
   const dispatch = useDispatch()
   const { projects, pagination, loading, error } = useSelector((state) => state.list)

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
            <p style={{ margin: '10px', fontSize: '22px', fontWeight: 'bold' }}>인기 프로젝트 ▶</p>
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
            <p style={{ margin: '10px', fontSize: '22px', fontWeight: 'bold' }}>신규 프로젝트 ▶</p>
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
            <p style={{ margin: '10px', fontSize: '22px', fontWeight: 'bold' }}>마감 임박 ▶</p>
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
            <p style={{ margin: '10px', fontSize: '22px', fontWeight: 'bold' }}>공개 예정 ▶</p>
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
