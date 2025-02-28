import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchReviewsThunk, reviewDelThunk, reviewRecommendDelThunk, reviewRecommendRegThunk, reviewRegThunk } from '../../features/fundingSlice'
import { Box, Grid2, Typography, Divider, Chip, Avatar, IconButton, TextField, Button, Rating, styled } from '@mui/material'
import RecommendIcon from '@mui/icons-material/Recommend'
import { ErrorBox, LoadingBox, ModalBox } from '../../styles/BaseStyles'

function FundingReview({ funding }) {
   const dispatch = useDispatch()
   const [page, setPage] = useState(1)
   const [loadingCount, setLoadingCount] = useState(5)
   const [allReviews, setAllReviews] = useState([])

   const [reviewInput, setReviewInput] = useState('')
   const [ImgFile, setImgFile] = useState(null)
   const [ImgUrl, setImgUrl] = useState('')
   const [rating, setRating] = useState(0)
   const [errorOpen, setErrorOpen] = useState(false)

   const { loading, error, reviews, reviewCount } = useSelector((state) => state.funding)
   const { isAuthenticated, user } = useSelector((state) => state.auth)

   useEffect(() => {
      dispatch(fetchReviewsThunk({ id: funding.id, page, limit: 5 }))
   }, [dispatch, page])

   useEffect(() => {
      setAllReviews([])
      setPage(1)
   }, [])

   // 리뷰 삭제
   const reviewDel = (id) => {
      dispatch(reviewDelThunk(id))
   }

   // 이미지 파일 등록
   const handleImgChange = useCallback((e) => {
      const file = e.target.files[0]
      if (!file) return

      setImgFile(file)

      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (event) => {
         setImgUrl(event.target.result)
      }
   }, [])

   // 이미지 등록 버튼용
   const VisuallyHiddenInput = styled('input')({
      clip: 'rect(0 0 0 0)',
      clipPath: 'inset(50%)',
      height: 1,
      overflow: 'hidden',
      position: 'absolute',
      bottom: 0,
      left: 0,
      whiteSpace: 'nowrap',
      width: 1,
   })

   const loadMoreReviews = () => {
      setLoadingCount(loadingCount + 5)
      setPage(page + 1) // 페이지 번호 증가
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
                  height: {
                     sm: '180px',
                     xs: '350px',
                  },
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
                  <img src={process.env.REACT_APP_API_URL + '/projectReviewImg' + review.imgUrl} width={'100%'} height={'180px'} style={{ display: 'block', objectFit: 'cover' }} />
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
                     {user?.id === review.userId && <Button onClick={() => reviewDel(review.id)}>삭제</Button>}
                     <IconButton onClick={() => handleRecommend(review.isRecommended, review.id)} sx={{ position: 'absolute', right: '0', color: review.isRecommended ? 'red' : '' }}>
                        <RecommendIcon />
                        <Typography sx={{ marginX: '8px' }}>{review.recommendCount}</Typography>
                     </IconButton>
                  </Box>
                  <Box my={1}>
                     <Rating name="read-only" value={review.star} size="small" readOnly />
                  </Box>
                  <ModalBox
                     openBtn={
                        <Typography
                           sx={{
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: '-webkit-box',
                              WebkitLineClamp: '3',
                              WebkitBoxOrient: 'vertical',
                              cursor: 'pointer',
                           }}
                           my={1}
                        >
                           {}
                           {review.contents}
                        </Typography>
                     }
                  >
                     <img src={process.env.REACT_APP_API_URL + '/projectReviewImg' + review.imgUrl} width={'100%'} style={{ display: 'block', objectFit: 'cover' }} />
                     {review.contents}
                  </ModalBox>
               </Grid2>
            </Grid2>
         )
      })
   }

   const submitReviewReg = async () => {
      if (reviewInput === '' || rating === 0) return
      const formData = new FormData()
      formData.append('id', funding.id)
      formData.append('reviewImg', ImgFile)
      formData.append('star', rating)
      formData.append('review', reviewInput)
      dispatch(reviewRegThunk(formData))
      setReviewInput('')
   }

   // 로딩 에러 처리
   if (loading) return <LoadingBox />
   if (error) return <ErrorBox error={error} open={errorOpen} setOpen={setErrorOpen} />

   return (
      <>
         {reviews && (
            <Box>
               <Typography p={1} variant="h5">
                  후기 {reviewCount?.count}건 평균 ★{reviewCount?.avg?.toFixed(2)}
               </Typography>
               <Box p={1}>
                  <TextField
                     value={reviewInput}
                     onChange={(e) => setReviewInput(e.target.value)}
                     InputProps={{
                        sx: { height: 120 },
                     }}
                     fullWidth
                     multiline
                     rows={4}
                     variant="outlined"
                     placeholder="리뷰 작성하기"
                  />
                  {/* 별점 */}
                  <Box py={1} sx={{ '& > legend': { mt: 2 } }}>
                     <Rating name="simple-controlled" value={rating} onChange={(event, newRating) => setRating(newRating)} />
                  </Box>
                  {/* 이미지 파일 미리보기 */}
                  {ImgUrl && <img src={ImgUrl} alt="업로드 이미지 미리보기" style={{ height: '50px', width: '50px', display: 'block' }} />}
                  {/* 이미지 등록 */}
                  <Button component="label" role={undefined} variant="contained" tabIndex={-1}>
                     이미지 업로드
                     <VisuallyHiddenInput type="file" onChange={handleImgChange} name="reviewImg" />
                  </Button>
                  {/* 리뷰 등록 */}
                  <Button onClick={isAuthenticated ? submitReviewReg : () => (window.location.href = '/login')} sx={{ marginY: '8px' }} variant="contained">
                     등록
                  </Button>
               </Box>
               {/* 리뷰 목록 */}
               {reviewCount?.count > 0 ? (
                  <>
                     {showAllReviews()}
                     <Box py={4}>
                        <Divider>{loadingCount >= reviewCount?.count ? <p style={{ textAlign: 'center', margin: '16px' }}>모든 리뷰를 불러왔습니다</p> : <Chip onClick={loadMoreReviews} label="더보기" />}</Divider>
                     </Box>
                  </>
               ) : (
                  <Typography p={2}>리뷰가 존재하지 않습니다.</Typography>
               )}
            </Box>
         )}
      </>
   )
}

export default FundingReview
