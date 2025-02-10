import { ProjectCard, CommingCard } from '../ui/Cards'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { fetchShowProjectsThunk } from '../../features/listSlice'
import { Grid2 } from '@mui/material'
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
               let totalOrderPrice = 0
               if (project.totalOrderPrice) totalOrderPrice = project.totalOrderPrice
               let rate = Math.floor((totalOrderPrice / project.goal) * 100)
               const projectData = {
                  studioName: project.Studio.name,
                  title: project.title,
                  intro: project.intro,
                  state: project.projectStatus,
                  imgUrl: process.env.REACT_APP_API_URL + '/projectImg' + project.imgUrl,
                  startDate: project.startDate,
                  endDate: project.endDate,
                  userCount: project.userCount,
                  rate,
               }
               if (type === 'comming')
                  return (
                     <Grid2 key={project.id} size={{ md: 3, sm: 6, xs: 12 }}>
                        <CommingCard key={project.id} project={projectData} />
                     </Grid2>
                  )
               else
                  return (
                     <Grid2 key={project.id} size={{ md: 3, sm: 6, xs: 12 }}>
                        <ProjectCard key={project.id} project={projectData} />
                     </Grid2>
                  )
            })
         )
      }
      if (cards.length) return cards
      else return <p>프로젝트가 존재하지 않습니다!</p>
   }

   return (
      projects && (
         <>
            <SubTitle>인기 프로젝트</SubTitle>
            <Grid2 container columnSpacing={1.5} rowSpacing={{ sm: 3, xs: 1.5 }}>
               {showCards('hot')}
            </Grid2>

            <SubTitle>신규 프로젝트</SubTitle>
            <Grid2 container columnSpacing={1.5} rowSpacing={{ sm: 3, xs: 1.5 }}>
               {showCards('new')}
            </Grid2>
            <SubTitle>마감 임박</SubTitle>
            <Grid2 container columnSpacing={1.5} rowSpacing={{ sm: 3, xs: 1.5 }}>
               {showCards('end')}
            </Grid2>
            <SubTitle>공개 예정</SubTitle>
            <Grid2 container columnSpacing={1.5} rowSpacing={{ sm: 3, xs: 1.5 }}>
               {showCards('comming')}
            </Grid2>
         </>
      )
   )
}

export default HomeProjects
