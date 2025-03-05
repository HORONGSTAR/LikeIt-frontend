import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { TextField, Button, Box, Stack } from '@mui/material'
import { createTimelineThunk, updateTimelineThunk } from '../../../features/timelineSlice'
import { fetchTimelineThunk, fetchTimelinesThunk } from '../../../features/fundingSlice'
import { fetchProjectByIdThunk } from '../../../features/projectSlice'
import { Main } from '../../../styles/BaseStyles'

function Timeline() {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { id, timelineId } = useParams()
   const timelines = useSelector((state) => state.funding?.timelines || [])
   const timeline = useSelector((state) => state.funding?.timeline)

   const today = new Date().toISOString().split('T')[0]
   const [title, setTitle] = useState(today)
   const [content, setContent] = useState('')
   const [imgFile, setImgFile] = useState(null)
   const [imagePreview, setImagePreview] = useState(null)
   const [error, setError] = useState('')

   useEffect(() => {
      if (timelineId && !timeline) {
         dispatch(fetchTimelineThunk(timelineId))
            .unwrap()
            .catch((err) => console.error('API 호출 실패:', err))
      }
   }, [dispatch, timelineId, timeline])

   useEffect(() => {
      if (timeline && timelineId) {
         setTitle(timeline.title || today)
         setContent(timeline.contents || '')
         setImagePreview(timeline.imgUrl ? `${process.env.REACT_APP_API_URL}${timeline.imgUrl}` : null)
      }
   }, [timeline, timelineId])

   const handleTitleChange = (e) => {
      const newTitle = e.target.value
      setTitle(newTitle)
      setError('')

      if (timelines.some((t) => t.title === newTitle && t.id !== timelineId)) {
         setError('이미 존재하는 제목입니다. 다른 제목을 입력해주세요.')
      }
   }

   const handleTitleBlur = () => {
      if (!title.trim()) {
         setTitle(today)
      }
   }

   const handleImageChange = (event) => {
      const file = event.target.files[0]
      if (file) {
         setImgFile(file)
         setImagePreview(URL.createObjectURL(file))
      }
   }

   const handleSubmit = async () => {
      if (!content.trim()) {
         alert('내용을 입력해주세요.')
         return
      }

      if (!id) {
         alert('프로젝트 ID가 없습니다. Redux 상태를 확인해주세요.')
         return
      }

      const formData = new FormData()
      formData.append('title', title)
      formData.append('contents', content)
      formData.append('projectId', id)
      if (imgFile) {
         formData.append('image', imgFile)
      }

      try {
         if (timelineId) {
            await dispatch(updateTimelineThunk({ timelineId, formData })).unwrap()
            alert('게시글이 수정되었습니다!')
         } else {
            await dispatch(createTimelineThunk(formData)).unwrap()
            alert('게시글이 등록되었습니다!')
         }

         setTitle(today)
         setContent('')
         setImgFile(null)
         setImagePreview(null)
         setError('')
         navigate(`/creator/${id}`)
      } catch (error) {
         alert(`게시글 ${timelineId ? '수정' : '등록'} 실패: ${error}`)
      }
   }

   return (
      <Main>
         <Box sx={{ p: 3, border: '1px solid #ccc', borderRadius: '8px' }}>
            <TextField fullWidth label="제목을 입력해주세요." value={title} onChange={handleTitleChange} onBlur={handleTitleBlur} error={!!error} helperText={error} sx={{ mb: 2 }} />

            {imagePreview && (
               <Box sx={{ textAlign: 'center', mb: 2 }}>
                  <img src={imagePreview} alt="미리보기" style={{ maxWidth: '250px', maxHeight: '250px', objectFit: 'contain', border: '1px solid #ddd' }} />
               </Box>
            )}

            <TextField fullWidth multiline rows={4} placeholder="내용을 입력해주세요." value={content} onChange={(e) => setContent(e.target.value)} sx={{ mb: 2 }} />

            <Stack direction="row" spacing={2} justifyContent="center">
               <Button component="label" color="yellow" variant="contained">
                  이미지 첨부
                  <input type="file" hidden onChange={handleImageChange} />
               </Button>

               <Button variant="contained" color="yellow" onClick={handleSubmit} disabled={!!error}>
                  {timelineId ? '수정' : '등록'}
               </Button>

               <Button variant="outlined" color="orange" onClick={() => navigate(`/creator/${id}`)}>
                  취소
               </Button>
            </Stack>
         </Box>
      </Main>
   )
}

export default Timeline
