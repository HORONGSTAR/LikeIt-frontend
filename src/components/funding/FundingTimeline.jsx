import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTimelinesThunk, fetchTimelineThunk, timelineCommentDelThunk, timelineCommentRegThunk } from '../../features/fundingSlice'
import { Box, Divider, Chip, Typography, Grid2, Avatar, Button, Pagination, Stack, TextField } from '@mui/material'
import dayjs from 'dayjs'
import { ErrorBox, LoadingBox } from '../../styles/BaseStyles'
import { useParams, useNavigate } from 'react-router-dom'
import { deleteTimelineThunk } from '../../features/timelineSlice'

function FundingTimeline({ funding }) {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const [page, setPage] = useState(1)
   const [commentPage, setCommentPage] = useState(1)
   const [loadingCount, setLoadingCount] = useState(3)
   const [allTimelines, setAllTimelines] = useState([])
   const [nowTimeline, setNowTimeline] = useState(0)
   const [comment, setComment] = useState('')
   const [errorOpen, setErrorOpen] = useState(false)
   const { id } = useParams()
   const { user } = useSelector((state) => state.auth)
   const { creators } = useSelector((state) => state.creator)
   const isCreator = creators.some((creator) => creator.Creator?.User?.id === user?.id)

   const { timelineCount, timelines, timeline, loading, error } = useSelector((state) => state.funding)

   useEffect(() => {
      dispatch(fetchTimelinesThunk({ id, page, limit: 3 }))
   }, [dispatch, page, id])

   // 뒤로가기 제어
   useEffect(() => {
      if (nowTimeline === 0) return
      const handlePopState = () => {
         setNowTimeline(0)
      }

      window.history.pushState(null, '', window.location.href)
      window.addEventListener('popstate', handlePopState)

      return () => {
         window.removeEventListener('popstate', handlePopState)
      }
   }, [nowTimeline])

   useEffect(() => {
      const newTimelines = []
      timelines.forEach((timeline) => {
         newTimelines.push(
            <Grid2 container key={timeline.id} sx={{ display: 'flex', border: '1px solid #dddddd', height: '180px', overflow: 'hidden' }} m={1}>
               <Grid2
                  size={{
                     xs: 6,
                     sm: 4,
                  }}
               >
                  <img onClick={() => timelineDetail(timeline.id)} src={`${process.env.REACT_APP_API_URL}${timeline.imgUrl}` || null} width={'100%'} height={'180px'} style={{ display: 'block', cursor: 'pointer', objectFit: 'cover' }} />
               </Grid2>
               <Grid2
                  size={{
                     xs: 6,
                     sm: 8,
                  }}
                  p={2}
               >
                  <Typography sx={{ cursor: 'pointer' }} onClick={() => timelineDetail(timeline.id)}>
                     {timeline.title}
                  </Typography>
                  <Typography>{dayjs(timeline.createdAt).format('YYYY-MM-DD')}</Typography>
               </Grid2>
            </Grid2>
         )
      })
      setAllTimelines((prevTimelines) => (page === 1 ? newTimelines : [...prevTimelines, ...newTimelines]))
   }, [timelines])

   const loadMoreTimelines = () => {
      setLoadingCount(loadingCount + 3)
      setPage(page + 1) // 페이지 번호 증가
   }

   const timelineDetail = (id) => {
      setNowTimeline(id)
      dispatch(fetchTimelineThunk(id))
   }

   const timelineList = () => {
      setNowTimeline(0)
   }

   const commentDel = (id) => {
      dispatch(timelineCommentDelThunk(id))
   }

   const showComments = useCallback(() => {
      if (timeline) {
         const start = (commentPage - 1) * 10
         const end = commentPage * 10
         const commentArray = timeline.ProjectTimelineComments.slice(start, end)
         return commentArray.map((comment) => (
            <Grid2 p={1} pb={3} m={1} container key={comment.id} sx={{ borderTop: '1px solid #dddddd' }}>
               <Grid2 sx={{ display: 'flex', position: 'relative' }} size={{ xs: 12 }}>
                  <Avatar src={process.env.REACT_APP_API_URL + '/userImg' + comment.User.imgUrl} sx={{ width: 40, height: 40, mr: 2 }} />
                  <Typography sx={{ lineHeight: '40px' }}>{comment.User.name}</Typography>
                  {user?.id === comment.User.id && (
                     <Button onClick={commentDel(comment.id)} sx={{ position: 'absolute', right: '0' }}>
                        삭제
                     </Button>
                  )}
               </Grid2>
               <Grid2 py={1} size={{ xs: 12 }}>
                  <Typography variant="body2">{dayjs(comment.createdAt).format('YYYY년 MM월 DD일 hh:mm:ss')}</Typography>
               </Grid2>
               <Grid2 size={{ xs: 12 }}>{comment.comment}</Grid2>
            </Grid2>
         ))
      }
   }, [timeline, commentPage])

   const submitCommentReg = async () => {
      if (comment === '') return
      await dispatch(timelineCommentRegThunk({ id: timeline.id, comment }))
      setComment('')
      dispatch(fetchTimelineThunk(timeline.id))
   }

   const goToCreateTimeline = () => {
      navigate(`/creator/${id}/timeline/create`)
   }

   const handleDelete = async () => {
      if (!window.confirm('정말 삭제하시겠습니까?')) return

      try {
         await dispatch(deleteTimelineThunk(nowTimeline)).unwrap()
         alert('삭제되었습니다.')
         dispatch(fetchTimelineThunk(id))
      } catch (error) {
         alert(`삭제 실패: ${error}`)
      }
   }

   // 로딩 에러 처리
   if (loading) return <LoadingBox />
   if (error) return <ErrorBox error={error} open={errorOpen} setOpen={setErrorOpen} />

   return (
      <>
         <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2, mr: 2 }}>
            {isCreator && !nowTimeline && (
               <Button variant="contained" onClick={goToCreateTimeline}>
                  글쓰기
               </Button>
            )}
         </Box>

         {timelineCount ? (
            nowTimeline ? (
               timeline && (
                  <Box>
                     <Button variant="contained" sx={{ borderBottom: '1px solid #dddddd', margin: '16px' }} onClick={timelineList}>
                        목록
                     </Button>
                     <Typography my={2} pb={2} variant="h4" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        {/* 제목과 날짜를 한 줄로 정리 */}
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', ml: 2 }}>
                           {timeline.title}
                           <Typography variant="body2" sx={{ color: 'gray' }}>
                              {dayjs(timeline.createdAt).format('YYYY년 MM월 DD일 hh:mm:ss')}
                           </Typography>
                        </Box>

                        {/* 수정/삭제 버튼 (창작자만 가능) */}
                        {isCreator && (
                           <Box>
                              <Button variant="contained" size="small" sx={{ mr: 1 }} onClick={() => navigate(`/creator/${id}/timeline/${nowTimeline}/edit`)}>
                                 수정
                              </Button>
                              <Button variant="outlined" color="error" size="small" onClick={handleDelete}>
                                 삭제
                              </Button>
                           </Box>
                        )}
                     </Typography>

                     <img src={`${process.env.REACT_APP_API_URL}${timeline.imgUrl}` || null} width={'90%'} style={{ display: 'block', margin: '0 auto' }} />
                     <Typography m={2}>{timeline.contents}</Typography>

                     {showComments()}
                     <Stack spacing={2}>
                        <Pagination onChange={(e, value) => setCommentPage(value)} count={timeline.ProjectTimelineComments.length > 0 ? Math.ceil(timeline.ProjectTimelineComments.length / 10) : 1} />
                     </Stack>
                     <Box p={1}>
                        <TextField
                           value={comment}
                           onChange={(e) => {
                              setComment(e.target.value)
                           }}
                           InputProps={{
                              sx: { height: 120 },
                           }}
                           fullWidth
                           multiline
                           rows={4}
                           variant="outlined"
                           placeholder="댓글 작성하기"
                        />
                        <Button onClick={user ? submitCommentReg : () => (window.location.href = '/login')} sx={{ marginY: '8px' }} variant="contained">
                           등록
                        </Button>
                     </Box>
                  </Box>
               )
            ) : (
               <>
                  {allTimelines}
                  <Box py={4}>
                     <Divider>{loadingCount >= timelineCount ? <p style={{ textAlign: 'center', margin: '16px' }}>모든 프로젝트를 불러왔습니다</p> : <Chip onClick={loadMoreTimelines} label="더보기" />}</Divider>
                  </Box>
               </>
            )
         ) : (
            <Typography>진행 소식이 존재하지 않습니다.</Typography>
         )}
      </>
   )
}

export default FundingTimeline
