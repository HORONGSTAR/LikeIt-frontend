import { Box, Grid2, Typography } from '@mui/material'
import { ErrorBox, LoadingBox, Main } from '../styles/BaseStyles'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect, useState } from 'react'
import { fetchShowRanksThunk, fetchShowMyRankThunk } from '../features/rankSlice'
import { Link } from 'react-router-dom'

function RankingPage() {
   const dispatch = useDispatch()
   const { myRank, ranks, loading, error } = useSelector((state) => state.rank)
   const { isAuthenticated, user } = useSelector((state) => state.auth)
   const [errorOpen, setErrorOpen] = useState(false)

   useEffect(() => {
      dispatch(fetchShowRanksThunk())
   }, [dispatch])

   useEffect(() => {
      if (isAuthenticated) {
         dispatch(fetchShowMyRankThunk(user.id))
      }
   }, [dispatch, isAuthenticated, user])

   const showUsersImg = (ranksArray) => {
      if (!ranksArray) return
      return (
         <Grid2 container>
            {ranksArray.map((ranks, index) => {
               return (
                  <Grid2
                     key={ranks.id}
                     size={4}
                     sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                     }}
                  >
                     <Box
                        key={ranks.id}
                        m={1}
                        sx={{
                           position: 'relative',
                           backgroundColor: '#ffcc4d',
                           display: 'flex',
                           justifyContent: 'center',
                           alignItems: 'center',
                           width: index < 1 ? '90%' : '70%',
                           aspectRatio: '1',
                           borderRadius: '50%',
                        }}
                     >
                        <img
                           src={process.env.REACT_APP_IMG_URL + '/userImg' + ranks.imgUrl}
                           alt="profile"
                           style={{
                              width: '85%',
                              aspectRatio: '1',
                              borderRadius: '50%',
                              objectFit: 'cover',
                           }}
                        ></img>
                        <Box
                           p={0.5}
                           sx={{
                              position: 'absolute',
                              top: '0',
                              right: '0',
                              backgroundColor: '#ffcc4d',
                              borderRadius: '50%',
                              fontSize: {
                                 sm: '14px',
                                 md: '18px',
                              },
                           }}
                        >
                           {index + 1}위
                        </Box>
                     </Box>
                     <p style={{ textAlign: 'center' }}>{ranks.name}</p>
                  </Grid2>
               )
            })}
         </Grid2>
      )
   }

   const showUsersCount = (ranksArray) => {
      if (!ranksArray) return
      return ranksArray.map((rank, index) => {
         return (
            <p
               key={rank.id}
               style={{
                  borderBottom: '1px solid silver',
                  display: 'flex',
                  justifyContent: 'space-between',
               }}
            >
               <span>
                  {index + 1}위 {rank.name}
               </span>
               <span style={{ marginRight: '8px' }}>{rank.userCount} 회</span>
            </p>
         )
      })
   }

   const showUsersPriceCount = (ranksArray) => {
      if (!ranksArray) return
      return ranksArray.map((rank, index) => {
         return (
            <p
               key={rank.id}
               style={{
                  borderBottom: '1px solid silver',
                  display: 'flex',
                  justifyContent: 'space-between',
               }}
            >
               <span>
                  {index + 1}위 {rank.name}
               </span>
               <span style={{ marginRight: '8px' }}>{Number(rank.priceCount).toLocaleString('ko-KR')} 원</span>
            </p>
         )
      })
   }

   const showMyRank = () => {
      if (!user) return <p>로그인이 필요합니다.</p>
      let priceSum = 0
      if (myRank) {
         if (myRank.priceSum) priceSum = myRank.priceSum
         return (
            <>
               <p>
                  <span>
                     <img src={'images/icon/medal-solid.svg'} height={'16px'} style={{ marginRight: '4px' }} />
                     후기 작성 횟수
                  </span>
                  <span>{myRank.reviewRank}위</span>
                  <span>{myRank.reviewCount} 회</span>
               </p>
               <p>
                  <span>
                     <img src={'images/icon/crown-solid.svg'} height={'16px'} style={{ marginRight: '4px' }} />
                     후원 횟수
                  </span>
                  <span>{myRank.orderRank}위</span>
                  <span>{myRank.orderCount} 회</span>
               </p>
               <p>
                  <span>
                     <img src={'images/icon/trophy-solid.svg'} height={'16px'} style={{ marginRight: '4px' }} />총 후원 금액
                  </span>
                  <span>{myRank.priceRank}위</span>
                  <span>{Number(priceSum).toLocaleString('ko-KR')} 원</span>
               </p>
            </>
         )
      }
   }

   if (loading) return <LoadingBox />
   if (error) return <ErrorBox error={error} open={errorOpen} setOpen={setErrorOpen} />

   return (
      ranks && (
         <Main>
            <Box src="./images/rankBanner2.svg" component="img" alt="후원랭킹배너" sx={{ borderRadius: 2.5, width: '100%', boxShadow: '0px 2px 4px rgba(0,0,0,0.25)' }} />
            <Typography variant="h4" pl={1}>
               후기 최다 작성자
            </Typography>
            <Grid2 container spacing={2}>
               {/* 후기 최다 작성자 좌측박스 */}
               <Grid2
                  size={{ sm: 6 }}
                  sx={{
                     display: {
                        xs: 'none',
                        sm: 'block',
                     },
                  }}
               >
                  <Box p={1} sx={{ backgroundColor: '#f6f4ed', borderRadius: '10px' }}>
                     {showUsersImg(ranks.reviewCountRank)}
                  </Box>
               </Grid2>
               {/* 후기 최다 작성자 우측박스 */}
               <Grid2 size={{ sm: 6, xs: 12 }}>
                  <Box
                     sx={{
                        height: '100%',
                        '& > p': {
                           paddingLeft: '8px',
                           height: {
                              xs: '40px',
                              sm: '25%',
                           },
                           display: 'flex',
                           alignItems: 'center',
                        },
                     }}
                  >
                     <p
                        style={{
                           backgroundColor: '#f6f4ed',
                           borderRadius: '10px 10px 0 0',
                        }}
                     >
                        <img src={'images/icon/medal-solid.svg'} height={'16px'} style={{ padding: '0 8px' }} />
                        후기 최다 작성자 순위
                     </p>
                     {showUsersCount(ranks.reviewCountRank)}
                  </Box>
               </Grid2>
            </Grid2>
            <Typography variant="h4" pl={1}>
               최다 후원자
            </Typography>
            <Grid2 container spacing={2}>
               <Grid2
                  size={{ sm: 6 }}
                  sx={{
                     display: {
                        xs: 'none',
                        sm: 'block',
                     },
                  }}
               >
                  <Box p={1} sx={{ backgroundColor: '#f6f4ed', borderRadius: '10px' }}>
                     {showUsersImg(ranks.orderCountRank)}
                  </Box>
               </Grid2>
               <Grid2 size={{ sm: 6, xs: 12 }}>
                  <Box
                     sx={{
                        height: '100%',
                        '& > p': {
                           paddingLeft: '8px',
                           height: {
                              xs: '40px',
                              sm: '25%',
                           },
                           display: 'flex',
                           alignItems: 'center',
                        },
                     }}
                  >
                     <p
                        style={{
                           backgroundColor: '#f6f4ed',
                           borderRadius: '10px 10px 0 0',
                        }}
                     >
                        <img src={'images/icon/crown-solid.svg'} height={'16px'} style={{ padding: '0 8px' }} />
                        최다 후원자 순위
                     </p>
                     {showUsersCount(ranks.orderCountRank)}
                  </Box>
               </Grid2>
            </Grid2>
            <Typography variant="h4" pl={1}>
               최고 후원금액
            </Typography>
            <Grid2 container spacing={2}>
               <Grid2
                  size={{ sm: 6 }}
                  sx={{
                     display: {
                        xs: 'none',
                        sm: 'block',
                     },
                  }}
               >
                  <Box p={1} sx={{ backgroundColor: '#f6f4ed', borderRadius: '10px' }}>
                     {showUsersImg(ranks.orderTopRank)}
                  </Box>
               </Grid2>
               <Grid2 size={{ sm: 6, xs: 12 }}>
                  <Box
                     sx={{
                        height: '100%',
                        '& > p': {
                           paddingLeft: '8px',
                           height: {
                              xs: '40px',
                              sm: '25%',
                           },
                           display: 'flex',
                           alignItems: 'center',
                        },
                     }}
                  >
                     <p
                        style={{
                           backgroundColor: '#f6f4ed',
                           borderRadius: '10px 10px 0 0',
                        }}
                     >
                        <img src={'images/icon/trophy-solid.svg'} height={'16px'} style={{ padding: '0 8px' }} />
                        최고 후원금액 순위
                     </p>
                     {showUsersPriceCount(ranks.orderTopRank)}
                  </Box>
               </Grid2>
            </Grid2>

            <Grid2 container spacing={2}>
               {/* 나의 순위 */}
               <Grid2 size={{ sm: 6, xs: 12 }}>
                  <Box
                     sx={{
                        height: '100%',
                        marginTop: '20px',
                        '& > p': {
                           paddingLeft: '8px',
                           minHeight: {
                              xs: '40px',
                              sm: '20%',
                           },
                           display: 'flex',
                           alignItems: 'center',
                        },
                        '& > p:nth-of-type(n+2)': {
                           borderBottom: '1px solid silver',
                           display: 'flex',
                           justifyContent: 'space-between',
                        },
                        '& > p > span:nth-of-type(1)': {
                           width: '40%',
                        },
                        '& > p > span:nth-of-type(2)': {
                           width: '15%',
                           textAlign: 'right',
                        },
                        '& > p > span:nth-of-type(3)': {
                           width: '45%',
                           textAlign: 'right',
                        },
                     }}
                  >
                     <p
                        style={{
                           backgroundColor: '#dbe7d9',
                           borderRadius: '10px 10px 0 0',
                        }}
                     >
                        나의 순위
                     </p>
                     {showMyRank()}
                  </Box>
               </Grid2>
               {/* 후원 랭킹 이미지 */}
               <Grid2 size={{ sm: 6, xs: 12 }}>
                  <Box
                     sx={{
                        display: {
                           xs: 'none',
                           sm: 'block',
                        },
                     }}
                  >
                     <Link to="/new">
                        <Box component="img" src="./images/rankBanner3.svg" alt="후원랭킹배너" sx={{ borderRadius: 2.5, width: '100%', boxShadow: '0px 2px 4px rgba(0,0,0,0.25)' }} />
                     </Link>
                  </Box>
               </Grid2>
            </Grid2>
         </Main>
      )
   )
}

export default RankingPage
