import { StudioCard } from '../../components/ui/Cards'
import { Grid2 } from '@mui/material'
import { Box, Divider, Chip } from '@mui/material'

import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchShowFollowStudiosThunk } from '../../features/listSlice'
import { ErrorBox, Main, LoadingBox } from '../../styles/BaseStyles'
import { Link } from 'react-router-dom'

// 회원기능 구현 대기중
const FollowPage = () => {
   const dispatch = useDispatch()
   const { followUser, count, loading, error } = useSelector((state) => state.list)
   const { isAuthenticated, user } = useSelector((state) => state.auth)
   const [page, setPage] = useState(1)
   const [allCards, setAllCards] = useState([])
   const [loadingCount, setLoadingCount] = useState(8)
   const [scrollPosition, setScrollPosition] = useState(0)
   const [errorOpen, setErrorOpen] = useState(false)

   useEffect(() => {
      if (user)
         dispatch(fetchShowFollowStudiosThunk({ page, id: user.id }))
            .unwrap()
            .then()
            .catch(() => setErrorOpen(true))
   }, [dispatch, page, user])

   useEffect(() => {
      const newCards = []
      let cardCount = 0
      let row = []

      if (followUser) {
         followUser.Studios.forEach((studio, index) => {
            const studioData = {
               id: studio.id,
               name: studio.name,
               intro: studio.intro,
               follow: studio.userCount,
               imgUrl: process.env.REACT_APP_API_URL + '/studioImg/' + studio.imgUrl,
            }
            cardCount++
            row.push(
               <Grid2 key={studio.id} size={{ md: 3, sm: 6, xs: 12 }}>
                  <StudioCard key={studio.id} studio={studioData} />
               </Grid2>
            )

            console.log(row)
            // 4개마다 새로운 row로 묶기
            if (cardCount % 4 === 0 || index === followUser.Studios.length - 1) {
               newCards.push(
                  <Grid2 key={studio.id} container columnSpacing={1.5} rowSpacing={{ sm: 3, xs: 1.5 }}>
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
   }, [followUser])

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
         {isAuthenticated ? (
            count ? (
               <>
                  <p style={{ margin: '10px 0' }}>{count}개의 스튜디오를 구독중입니다.</p>
                  {allCards}
                  <Box py={4}>
                     <Divider>{loadingCount >= count ? <p style={{ textAlign: 'center', margin: '16px' }}>모든 프로젝트를 불러왔습니다</p> : <Chip onClick={loadMoreProjects} label="더보기" />}</Divider>
                  </Box>
               </>
            ) : (
               <img src={process.env.REACT_APP_FRONT_URL + '/images/noStudio.png'} width="640px" style={{ margin: '0 auto' }} alt="스튜디오 없음"></img>
            )
         ) : (
            <Link to="/login" style={{ display: 'inline-block', width: '640px', margin: '0 auto' }}>
               <img src={process.env.REACT_APP_FRONT_URL + '/images/loginRequest.png'} width="640px" alt="프로젝트 없음"></img>
            </Link>
         )}
      </Main>
   )
}

export default FollowPage
