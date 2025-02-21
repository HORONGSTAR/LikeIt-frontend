import { useState } from 'react'
import { TextField, Button, Box, Stack, Typography } from '@mui/material'

function News({ onSubmit, onCancel }) {
   const today = new Date().toISOString().split('T')[0] // 오늘 날짜 가져오기
   const [date, setDate] = useState(today) // 기본값: 오늘 날짜
   const [content, setContent] = useState('')
   const [image, setImage] = useState(null)
   const [imagePreview, setImagePreview] = useState(null) // 미리보기 이미지 URL 상태

   // 이미지 선택 핸들러
   const handleImageChange = (event) => {
      const file = event.target.files[0]
      if (file) {
         setImage(file)
         setImagePreview(URL.createObjectURL(file)) // 미리보기 URL 생성
      }
   }

   // 폼 제출 핸들러
   const handleSubmit = () => {
      if (!date || !content) {
         alert('날짜와 내용을 입력해주세요.')
         return
      }

      const formData = new FormData()
      formData.append('date', date)
      formData.append('content', content)
      if (image) {
         formData.append('image', image)
      }

      onSubmit(formData)
   }

   return (
      <Box sx={{ p: 3, border: '1px solid #ccc', borderRadius: '8px' }}>
         {/* 날짜 입력 */}
         <TextField fullWidth type="date" value={date} onChange={(e) => setDate(e.target.value)} sx={{ mb: 2 }} />

         {/* 이미지 미리보기 */}
         {imagePreview && (
            <Box sx={{ textAlign: 'center', mb: 2 }}>
               <img src={imagePreview} alt="미리보기" style={{ maxWidth: '250px', maxHeight: '250px', objectFit: 'contain', border: '1px solid #ddd' }} />
            </Box>
         )}
         {/* 내용 입력 */}
         <TextField fullWidth multiline rows={4} placeholder="내용을 입력해주세요." value={content} onChange={(e) => setContent(e.target.value)} sx={{ mb: 2 }} />

         {/* 버튼 영역 */}
         <Stack direction="row" spacing={2} justifyContent="center">
            <Button component="label" variant="contained" sx={{ backgroundColor: '#D77A1A', color: '#fff' }}>
               이미지 첨부
               <input type="file" hidden onChange={handleImageChange} />
            </Button>
            <Button variant="contained" sx={{ backgroundColor: '#D77A1A', color: '#fff' }} onClick={handleSubmit}>
               등록
            </Button>
            <Button variant="outlined" sx={{ borderColor: '#D77A1A', color: '#D77A1A' }} onClick={onCancel}>
               취소
            </Button>
         </Stack>
      </Box>
   )
}

export default News
