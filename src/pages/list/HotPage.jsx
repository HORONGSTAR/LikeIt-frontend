import { ProjectCard } from '../../components/ui/Cards'
import { Grid2 } from '@mui/material'
import { Box, Divider, Chip } from '@mui/material'

import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchShowProjectsThunk } from '../../features/listSlice'
import { ErrorBox, LoadingBox, Main } from '../../styles/BaseStyles'

const HotPage = () => {
   const dispatch = useDispatch()
   const { projects, count, loading, error } = useSelector((state) => state.list)
   const [page, setPage] = useState(1)
   const [allCards, setAllCards] = useState([])
   const [loadingCount, setLoadingCount] = useState(8)
   const [scrollPosition, setScrollPosition] = useState(0)
   const [errorOpen, setErrorOpen] = useState(false)

   useEffect(() => {
      dispatch(fetchShowProjectsThunk({ page, limit: 8, type: 'hot' }))
         .unwrap()
         .then()
         .catch(() => setErrorOpen(true))
   }, [dispatch, page])

   useEffect(() => {
      const newCards = []
      let cardCount = 0
      let row = []

      if (projects && projects.hot) {
         projects.hot.forEach((project, index) => {
            let totalOrderPrice = 0
            if (project.totalOrderPrice) totalOrderPrice = project.totalOrderPrice
            let rate = Math.floor((totalOrderPrice / project.goal) * 100)
            const projectData = {
               id: project.id,
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
            cardCount++
            row.push(
               <Grid2 key={project.id} size={{ md: 3, sm: 6, xs: 12 }}>
                  <ProjectCard key={project.id} project={projectData} />
               </Grid2>
            )

            // 4개마다 새로운 row로 묶기
            if (cardCount % 4 === 0 || index === projects.hot.length - 1) {
               newCards.push(
                  <Grid2 key={project.id} container columnSpacing={1.5} rowSpacing={{ sm: 3, xs: 1.5 }}>
                     {row}
                  </Grid2>
               )
               row = [] // 다음 배치를 위해 row 배열 초기화
            }
         })
         setAllCards((prevCards) => (page === 1 ? newCards : [...prevCards, ...newCards]))
         // 스크롤 위치 변경 setTimeout을 사용해 순서 보장
         setTimeout(() => {
            window.scrollTo(0, scrollPosition)
         }, 0)
      }
   }, [projects])

   const loadMoreProjects = () => {
      setScrollPosition(window.scrollY)
      setLoadingCount(loadingCount + 8)
      setPage(page + 1) // 페이지 번호 증가
   }

   // 로딩 에러 처리
   if (loading) return <LoadingBox />
   if (error) return <ErrorBox error={error} open={errorOpen} setOpen={setErrorOpen} />

   return (
      <Main>
         {count ? (
            <>
               <p style={{ margin: '10px 0' }}>{count}개의 프로젝트가 있습니다.</p>
               {allCards}
               <Box py={4}>
                  <Divider>{loadingCount >= count ? <p style={{ textAlign: 'center', margin: '16px' }}>모든 프로젝트를 불러왔습니다</p> : <Chip onClick={loadMoreProjects} label="더보기" />}</Divider>
               </Box>
            </>
         ) : (
            <img src={process.env.REACT_APP_FRONT_URL + '/images/noProject.png'} width="640px" style={{ margin: '0 auto' }} alt="프로젝트 없음"></img>
         )}
      </Main>
   )
}

export default HotPage
