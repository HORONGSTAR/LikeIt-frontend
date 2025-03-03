import { ProjectCard, CommingCard } from '../ui/Cards'
import { useEffect, useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchShowProjectsThunk, noticeRegThunk, noticeDelThunk } from '../../features/listSlice'
import { Grid2 } from '@mui/material'
import { ErrorBox, LoadingBox, SubTitle } from '../../styles/BaseStyles'

function HomeProjects() {
   const dispatch = useDispatch()
   const { projects, loading: listLoading, error: listError } = useSelector((state) => state.list)
   const { isAuthenticated, loading: authLoading, error: authError } = useSelector((state) => state.auth)

   // 알림 신청 버튼 실시간 반영을 위해 따로 처리
   const [commingCards, setCommingCards] = useState([])
   // 에러 처리용
   const [errorOpen, setErrorOpen] = useState(false)
   const globalError = authError || listError
   const globalLoading = authLoading || listLoading

   // 알림 신청, 해제 Card 컴포넌트로 전달

   const showCards = useCallback(
      (type) => {
         const noticeReg = (id) => {
            dispatch(noticeRegThunk(id))
               .unwrap()
               .then()
               .catch(() => setErrorOpen(true))
         }
         const noticeDel = (id) => {
            dispatch(noticeDelThunk(id))
               .unwrap()
               .then()
               .catch(() => setErrorOpen(true))
         }
         let cards = []
         if (projects[type]) {
            cards = cards.concat(
               projects[type].map((project) => {
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
                     isFavorite: project.isFavorite,
                     rate,
                     noticeReg,
                     noticeDel,
                     isAuthenticated,
                  }
                  if (type === 'comming') {
                     setCommingCards((prevCards) => [
                        ...prevCards,
                        <Grid2 key={project.id} size={{ md: 3, sm: 6, xs: 12 }}>
                           <CommingCard key={project.id} project={projectData} />
                        </Grid2>,
                     ])
                     return null
                  } else
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
      },
      [dispatch, projects, isAuthenticated]
   )

   useEffect(() => {
      setCommingCards([])
      showCards('comming')
   }, [projects, showCards])

   useEffect(() => {
      dispatch(fetchShowProjectsThunk({ type: 'all' }))
         .unwrap()
         .then()
         .catch(() => setErrorOpen(true))
   }, [dispatch])

   // 로딩 에러 처리
   if (globalLoading) return <LoadingBox />
   if (globalError) return <ErrorBox error={globalError} open={errorOpen} setOpen={setErrorOpen} />

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
               {commingCards}
            </Grid2>
         </>
      )
   )
}

export default HomeProjects
