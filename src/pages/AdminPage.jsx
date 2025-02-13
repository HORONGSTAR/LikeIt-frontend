import { AdminCard } from '../components/ui/Cards'
import { Grid2 } from '@mui/material'
import { Box, Divider, Chip } from '@mui/material'

import { useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { bannerDelThunk, bannerRegThunk, fetchShowAdminProjectsThunk, proposalDenyThunk, proposalPassThunk } from '../features/adminSlice'
import { LoadingBox, Main } from '../styles/BaseStyles'

function AdminPage() {
   const dispatch = useDispatch()
   const { projects, count, loading, error } = useSelector((state) => state.admin)
   const [page, setPage] = useState(1)
   const [allCards, setAllCards] = useState([])
   const [loadingCount, setLoadingCount] = useState(8)
   const [scrollPosition, setScrollPosition] = useState(0)

   useEffect(() => {
      dispatch(fetchShowAdminProjectsThunk(page))
   }, [dispatch, page])

   const bannerReg = useCallback(
      (id) => {
         dispatch(bannerRegThunk(id))
      },
      [dispatch]
   )
   const bannerDel = useCallback(
      (id) => {
         dispatch(bannerDelThunk(id))
      },
      [dispatch]
   )
   const proposalPass = useCallback(
      (id) => {
         dispatch(proposalPassThunk(id))
      },
      [dispatch]
   )
   const proposalDeny = useCallback(
      (id, denyMsg) => {
         dispatch(proposalDenyThunk({ id, denyMsg }))
      },
      [dispatch]
   )

   const adminFunc = {
      bannerReg,
      bannerDel,
      proposalPass,
      proposalDeny,
   }

   // 리스트 호출
   useEffect(() => {
      const newCards = []
      let cardCount = 0
      let row = []

      if (projects) {
         projects.forEach((project, index) => {
            let totalOrderPrice = 0
            if (project.totalOrderPrice) totalOrderPrice = project.totalOrderPrice
            let rate = Math.floor((totalOrderPrice / project.goal) * 100)
            let projectData = {
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
               proposalStatus: project.proposalStatus,
            }
            if (project.BannerProject) projectData.bannerId = project.BannerProject.id
            cardCount++
            row.push(
               <Grid2 key={project.id} size={{ md: 3, sm: 6, xs: 12 }}>
                  <AdminCard key={project.id} project={projectData} adminFunc={adminFunc} />
               </Grid2>
            )

            // 4개마다 새로운 row로 묶기
            if (cardCount % 4 === 0 || index === projects.length - 1) {
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

   if (loading)
      return (
         <Main>
            <LoadingBox />
         </Main>
      )
   if (error) return <Main>{error}</Main>

   return (
      <Main>
         <Box m={1} p={1} sx={{ border: '1px solid silver', borderRadius: '4px' }}>
            승인여부
         </Box>
         {count ? (
            <>
               <p style={{ margin: '10px 0' }}>{count}개의 프로젝트가 있습니다.</p>
               {allCards}
               <Box py={4}>
                  <Divider>{loadingCount >= count ? <p style={{ textAlign: 'center', margin: '16px' }}>모든 프로젝트를 불러왔습니다</p> : <Chip onClick={loadMoreProjects} label="더보기" />}</Divider>
               </Box>
            </>
         ) : (
            <img src={process.env.REACT_APP_FRONT_URL + '/images/noProject.png'} width="640px" style={{ margin: '0 auto' }}></img>
         )}
      </Main>
   )
}

export default AdminPage
