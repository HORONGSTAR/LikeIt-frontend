import { Box, Grid2, Typography } from '@mui/material'
import { Main } from '../styles/BaseStyles'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchShowRanksThunk } from '../features/indexSlice'
import styled from 'styled-components'

function RankingPage() {
   const dispatch = useDispatch()
   const { ranks, loading, error } = useSelector((state) => state.index)

   useEffect(() => {
      dispatch(fetchShowRanksThunk())
   }, [dispatch])

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
                           src={process.env.REACT_APP_API_URL + '/userImg' + ranks.imgUrl}
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
               <span style={{ marginRight: '8px' }}>{rank.userCount}회</span>
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
   // const showMyData = (ranksArray) => {
   //    if (!ranksArray) return
   //    return ranksArray.map((rank, index) => {
   //       return (
   //          <p key={rank.id} style={{ borderBottom: '1px solid silver' }}>
   //             {index + 1}위 {rank.name} {Number(rank.priceCount).toLocaleString('ko-KR')}원
   //          </p>
   //       )
   //    })
   // }

   return (
      ranks && (
         <Main>
            <img src="./images/rankBanner2.png" alt="후원랭킹배너" width="100%" style={{ margin: '20px 0' }} />
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
               최고 후원자
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
                        최고 후원자 순위
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
                           backgroundColor: '#dbe7d9',
                           borderRadius: '10px 10px 0 0',
                        }}
                     >
                        나의 순위
                     </p>
                     <p>test</p>
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
                     <img src="./images/rankBanner3.png" alt="후원랭킹배너" width="100%" style={{ margin: '20px 0' }} />
                  </Box>
               </Grid2>
            </Grid2>
         </Main>
      )
   )
}

export default RankingPage
