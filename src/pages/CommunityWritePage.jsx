import { useState } from 'react'
import { Box, Button, TextField, Typography, CardMedia, IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ImageIcon from '@mui/icons-material/Image'
import CloseIcon from '@mui/icons-material/Close'

const CommunityWritePage = () => {
   const navigate = useNavigate()
   const [title, setTitle] = useState('')
   const [content, setContent] = useState('')
   const [image, setImage] = useState(null)
   const [imageFile, setImageFile] = useState(null)

   // 이미지 선택 핸들러
   const handleImageChange = (e) => {
      const file = e.target.files[0]
      if (file) {
         setImageFile(file)
         setImage(URL.createObjectURL(file))
      }
   }

   // 이미지 삭제 핸들러
   const handleRemoveImage = () => {
      setImage(null)
      setImageFile(null)
   }

   // 등록 버튼 클릭 시 동작 (예제)
   const handlePostSubmit = () => {
      if (!title.trim() || !content.trim()) {
         alert('제목과 내용을 입력해주세요.')
         return
      }

      const newPost = {
         title,
         content,
         image: imageFile ? URL.createObjectURL(imageFile) : null,
      }

      console.log('새 글 등록:', newPost)
      navigate('/studio/commu') // 등록 후 목록으로 이동 (실제 저장 로직 필요)
   }

   return (
      <Box sx={{ maxWidth: '800px', margin: 'auto', mt: 5 }}>
         <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
            글 작성하기
         </Typography>

         {/* 제목 입력 */}
         <TextField fullWidth label="제목을 입력해주세요." variant="outlined" sx={{ mb: 2 }} value={title} onChange={(e) => setTitle(e.target.value)} />

         {/* 이미지 미리보기 + X 버튼 */}
         {image && (
            <Box sx={{ position: 'relative', display: 'inline-block', mt: 2 }}>
               <CardMedia component="img" image={image} alt="첨부 이미지" sx={{ borderRadius: 2, maxHeight: 300, objectFit: 'contain' }} />
               <IconButton sx={{ position: 'absolute', top: 5, right: 5, background: 'rgba(0, 0, 0, 0.5)', color: 'white' }} onClick={handleRemoveImage}>
                  <CloseIcon />
               </IconButton>
            </Box>
         )}

         {/* 내용 입력 */}
         <TextField fullWidth multiline rows={6} label="내용을 입력해주세요." variant="outlined" sx={{ mb: 2 }} value={content} onChange={(e) => setContent(e.target.value)} />

         {/* 버튼들 */}
         <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button variant="outlined" startIcon={<ImageIcon />} component="label">
               이미지 첨부
               <input type="file" hidden onChange={handleImageChange} />
            </Button>
            <Button variant="contained" color="primary" onClick={handlePostSubmit}>
               등록
            </Button>
            <Button variant="outlined" onClick={() => navigate('/studio/commu')}>
               취소
            </Button>
         </Box>
      </Box>
   )
}

export default CommunityWritePage
