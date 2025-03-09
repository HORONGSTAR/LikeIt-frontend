import { StudioCard } from '../../components/ui/Cards'
import { Grid2 } from '@mui/material'
import { Box, Divider, Chip, Stack, Typography } from '@mui/material'

import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchShowFollowStudiosThunk } from '../../features/listSlice'
import { ErrorBox, Main, LoadingBox } from '../../styles/BaseStyles'
import { Link } from 'react-router-dom'

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
               imgUrl: process.env.REACT_APP_IMG_URL + '/studioImg/' + studio.imgUrl,
            }
            cardCount++
            row.push(
               <Grid2 key={studio.id} size={{ md: 3, sm: 6, xs: 12 }}>
                  <StudioCard key={studio.id} studio={studioData} />
               </Grid2>
            )

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
                     <Divider>{loadingCount >= count ? <Typography color="grey">모든 프로젝트를 불러왔습니다</Typography> : <Chip onClick={loadMoreProjects} label="더보기" />}</Divider>
                  </Box>
               </>
            ) : (
               <Stack alignItems="center" pb={12}>
                  <img src={process.env.REACT_APP_FRONT_URL + '/images/noStudio.png'} width="100%" alt="스튜디오 없음" />
                  <Typography color="grey">구독 중인 스튜디오가 없습니다.</Typography>
                  <Typography variant="body2">관심 있는 스튜디오를 구독해보세요!</Typography>
               </Stack>
            )
         ) : (
            <Stack alignItems="center" pb={12}>
               <img src={process.env.REACT_APP_FRONT_URL + '/images/noProject.png'} width="100%" alt="프로젝트 없음" />
               <Typography color="grey">진행 중인 프로젝트가 없습니다.</Typography>
               <Typography variant="body2">당신의 아이디어를 뽐내보세요!</Typography>
            </Stack>
         )}
      </Main>
   )
}

export default FollowPage
