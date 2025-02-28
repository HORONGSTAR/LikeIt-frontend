import { Typography, Box, Divider, Chip, Avatar } from '@mui/material'
import { ErrorBox, LoadingBox, Main } from '../../styles/BaseStyles'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchMessagesThunk } from '../../features/messageSlice'

function Notice() {
   const dispatch = useDispatch()
   const { messages, count, loading, error } = useSelector((state) => state.message)
   const [page, setPage] = useState(1)
   const [scrollPosition, setScrollPosition] = useState(0)
   const [loadingCount, setLoadingCount] = useState(10)
   const [errorOpen, setErrorOpen] = useState(false)
   const [allMessages, setAllMessages] = useState([])

   useEffect(() => {
      dispatch(fetchMessagesThunk({ page, limit: 10 }))
         .unwrap()
         .then()
         .catch(() => setErrorOpen(true))
   }, [dispatch, page])

   useEffect(() => {
      const newMessages = []

      if (messages) {
         messages.forEach((message, index) => {
            let messageType = {
               folderUrl: '#',
               link: '#',
            }
            if (message.imgType === 'PROJECT') {
               messageType.folderUrl = '/projectImg'
               messageType.link = `/funding/${message.imgId}`
            }
            newMessages.push(
               <Box
                  p={2}
                  key={message.id}
                  sx={{
                     display: 'flex',
                     alignItems: 'center',
                     borderBottom: '1px solid #dddddd',
                     '&:last-child': {
                        borderBottom: 'none',
                     },
                  }}
               >
                  <Avatar src={process.env.REACT_APP_API_URL + messageType.folderUrl + message.imgUrl} sx={{ width: 50, height: 50, mr: 2, cursor: 'pointer' }} onClick={() => (window.location.href = messageType.link)} />
                  {message.message}
               </Box>
            )
         })

         setAllMessages((prevMessages) => (page === 1 ? newMessages : [...prevMessages, ...newMessages]))

         // 스크롤 위치 변경 setTimeout을 사용해 순서 보장
         setTimeout(() => {
            window.scrollTo(0, scrollPosition)
         }, 0)
      }
   }, [messages])

   const loadMoreMessages = () => {
      setScrollPosition(window.scrollY)
      setLoadingCount(loadingCount + 10)
      setPage(page + 1) // 페이지 번호 증가
   }

   // 로딩 에러 처리
   if (loading) return <LoadingBox />
   if (error) return <ErrorBox error={error} open={errorOpen} setOpen={setErrorOpen} />

   return (
      <Main>
         {count ? (
            <>
               <Box p={2} sx={{ border: '1px solid #dddddd' }}>
                  <p style={{ margin: '10px 0' }}>{count}개의 메시지가 있습니다.</p>
                  {allMessages}
               </Box>
               <Box py={4}>
                  <Divider>{loadingCount >= count ? <p style={{ textAlign: 'center', margin: '16px' }}>모든 메시지를 불러왔습니다</p> : <Chip onClick={loadMoreMessages} label="더보기" />}</Divider>
               </Box>
            </>
         ) : (
            <Typography variant="h4" sx={{ textAlign: 'center' }}>
               알림이 존재하지 않습니다
            </Typography>
         )}
      </Main>
   )
}

export default Notice
