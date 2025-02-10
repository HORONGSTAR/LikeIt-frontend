import ProjectCard from '../../components/list/ProjectCard'

import { Container, Box, Button } from '@mui/material'

import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchShowProjectsThunk } from '../../features/listSlice'

const HotPage = () => {
   const dispatch = useDispatch()
   const { projects, count, loading, error } = useSelector((state) => state.list)
   const [page, setPage] = useState(1)
   const [allCards, setAllCards] = useState([])
   const [loadingCount, setLoadingCount] = useState(8)
   const [scrollPosition, setScrollPosition] = useState(0)

   const handleScroll = () => {
      const position = window.pageYOffset
      setScrollPosition(position)
   }

   useEffect(() => {
      dispatch(fetchShowProjectsThunk({ page, limit: 8, type: 'hot' }))
   }, [dispatch, page])

   useEffect(() => {
      const newCards = []
      let cardCount = 0
      let row = []

      if (projects && projects.hot) {
         projects.hot.forEach((project, index) => {
            cardCount++
            row.push(<ProjectCard key={index} project={project} type="hot" />)

            // 4개마다 새로운 row로 묶기
            if (cardCount % 4 === 0 || index === projects.hot.length - 1) {
               newCards.push(
                  <Box
                     sx={{
                        display: {
                           xs: 'block',
                           sm: 'flex',
                        },
                     }}
                     className="Cards"
                     key={newCards.length + loadingCount}
                  >
                     {row}
                  </Box>
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
   }, [projects.hot])

   const loadMoreProjects = () => {
      setScrollPosition(window.scrollY)
      setLoadingCount(loadingCount + 8)
      setPage(page + 1) // 페이지 번호 증가
   }

   if (loading) return <>Loading...</>

   return (
      <Container maxWidth="md">
         <p style={{ margin: '10px 0' }}>{count}개의 프로젝트가 있습니다.</p>

         {allCards}
         {loadingCount >= count ? (
            <p style={{ textAlign: 'center', margin: '16px' }}>모든 프로젝트를 불러왔습니다</p>
         ) : (
            <Box display="flex" alignItems="center" width="100%" sx={{ my: 2 }}>
               <Box flexGrow={1} height="1px" bgcolor="gray" />
               <Button onClick={loadMoreProjects} variant="contained" sx={{ marginLeft: 2, marginRight: 2 }}>
                  더보기
               </Button>
               <Box flexGrow={1} height="1px" bgcolor="gray" />
            </Box>
         )}
      </Container>
   )
}

export default HotPage
