import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchReviewsThunk, reviewRecommendDelThunk, reviewRecommendRegThunk } from '../../features/fundingSlice'
import { Box, Grid2, Typography, Divider, Chip, Avatar, IconButton, TextField, Button } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import RecommendIcon from '@mui/icons-material/Recommend'

function FundingReview({ funding }) {
   const dispatch = useDispatch()
   const [page, setPage] = useState(1)
   const [loadingCount, setLoadingCount] = useState(5)
   const [allReviews, setAllReviews] = useState([])
   const [reviewInput, setReviewInput] = useState('')

   const { loading, error, reviews, reviewCount } = useSelector((state) => state.funding)
   const { isAuthenticated } = useSelector((state) => state.auth)

   useEffect(() => {
      dispatch(fetchReviewsThunk({ id: funding.id, page, limit: 5 }))
   }, [dispatch, page])

   const loadMoreReviews = () => {
      setLoadingCount(loadingCount + 5)
      setPage(page + 1) // 페이지 번호 증가
   }

   const stars = (stars) => {
      let starsArray = []
      for (let i = 0; i < stars; i++) {
         starsArray.push(<StarIcon key={i} color="yellow" fontSize="small" />)
      }
      return starsArray
   }

   const handleRecommend = (isRecommended, id) => {
      if (!isAuthenticated) {
         window.location.href = '/login'
         return
      }
      if (isRecommended) dispatch(reviewRecommendDelThunk(id))
      else dispatch(reviewRecommendRegThunk(id))
      setAllReviews((prevReviews) =>
         prevReviews.map((review) =>
            review.id === id
               ? {
                    ...review,
                    isRecommended: !isRecommended,
                    recommendCount: isRecommended ? review.recommendCount - 1 : review.recommendCount + 1,
                 }
               : review
         )
      )
   }

   useEffect(() => {
      if (reviews.length > 0) {
         setAllReviews((prevReviews) => (page === 1 ? reviews : [...prevReviews, ...reviews]))
      }
   }, [reviews])

   const showAllReviews = () => {
      return allReviews.map((review) => {
         return (
            <Grid2
               container
               key={review.id}
               sx={{
                  display: {
                     sm: 'flex',
                     xs: 'block',
                  },
                  border: '1px solid #dddddd',
               }}
               m={1}
            >
               <Grid2
                  size={{
                     xs: 12,
                     sm: 4,
                  }}
               >
                  <img src={process.env.REACT_APP_API_URL + '/projectReviewImg' + review.imgUrl} width={'100%'} height={'100%'} style={{ display: 'block', objectFit: 'cover' }} />
               </Grid2>
               <Grid2
                  size={{
                     xs: 12,
                     sm: 8,
                  }}
                  p={2}
               >
                  <Box sx={{ display: 'flex', position: 'relative' }}>
                     <Avatar src={process.env.REACT_APP_API_URL + '/userImg' + review.DirectReviews.imgUrl} sx={{ width: 40, height: 40, mr: 2 }} />
                     <Typography sx={{ lineHeight: '40px' }}>{review.DirectReviews.name}</Typography>
                     <IconButton onClick={() => handleRecommend(review.isRecommended, review.id)} sx={{ position: 'absolute', right: '0', color: review.isRecommended ? 'red' : '' }}>
                        <RecommendIcon />
                        <Typography sx={{ marginX: '8px' }}>{review.recommendCount}</Typography>
                     </IconButton>
                  </Box>
                  <Box my={1}>{stars(review.star)}</Box>
                  <Typography my={1}>{review.contents}</Typography>
               </Grid2>
            </Grid2>
         )
      })
   }

   const submitReviewReg = async () => {
      if (reviewInput === '') return
      setReviewInput('')
   }

   return (
      <>
         {reviewCount ? (
            reviews && (
               <>
                  <Box>
                     <Typography p={1} variant="h5">
                        후기 {reviewCount.count}건 평균 ★{reviewCount.avg.toFixed(2)}
                     </Typography>
                     <Box p={1}>
                        <TextField
                           value={reviewInput}
                           onChange={(e) => {
                              setReviewInput(e.target.value)
                           }}
                           InputProps={{
                              sx: { height: 120 },
                           }}
                           fullWidth
                           multiline
                           rows={4}
                           variant="outlined"
                           placeholder="리뷰 작성하기"
                        />
                        {/* 이미지 등록 */}
                        {/* 별점 */}
                        <Button onClick={isAuthenticated ? submitReviewReg : () => (window.location.href = '/login')} sx={{ marginY: '8px' }} variant="contained">
                           등록
                        </Button>
                     </Box>
                     {showAllReviews()}
                  </Box>
                  <Box py={4}>
                     <Divider>{loadingCount >= reviewCount.count ? <p style={{ textAlign: 'center', margin: '16px' }}>모든 리뷰를 불러왔습니다</p> : <Chip onClick={loadMoreReviews} label="더보기" />}</Divider>
                  </Box>
               </>
            )
         ) : (
            <Typography>리뷰가 존재하지 않습니다.</Typography>
         )}
      </>
   )
}

export default FundingReview
