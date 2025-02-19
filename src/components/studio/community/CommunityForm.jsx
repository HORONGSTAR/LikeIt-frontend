import React, { useState, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, TextField, Typography, CardMedia, IconButton } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import ImageIcon from '@mui/icons-material/Image'
import CloseIcon from '@mui/icons-material/Close'
import { createCommunityThunk } from '../../../features/communitySlice'
import { fetchStudioByIdThunk } from '../../../features/studioSlice'
import { checkAuthStatusThunk } from '../../../features/authSlice'

function CommunityForm() {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { id: studioIdFromUrl } = useParams()

   const user = useSelector((state) => state.auth.user)
   const userId = user?.id

   const studio = useSelector((state) => state.studio.studio)
   const studioId = studio?.id || studioIdFromUrl

   const [title, setTitle] = useState('')
   const [contents, setContents] = useState('')
   const [image, setImage] = useState(null)
   const [imgFile, setImgFile] = useState(null)
   const [error, setError] = useState('')

   useEffect(() => {
      if (!userId) {
         dispatch(checkAuthStatusThunk())
      }
      if (!studioId) {
         dispatch(fetchStudioByIdThunk(studioIdFromUrl))
      }
   }, [dispatch, userId, studioId, studioIdFromUrl])

   const handleImageChange = (e) => {
      const file = e.target.files[0]
      if (file) {
         setImgFile(file)
         setImage(URL.createObjectURL(file)) // 이미지 미리보기
      }
   }

   const handleRemoveImage = () => {
      setImage(null)
      setImgFile(null)
   }

   const handlePostSubmit = useCallback(async () => {
      if (!title.trim() || !contents.trim()) {
         setError('제목과 내용을 입력해주세요.')
         return
      }

      if (!studioId || !userId) {
         setError('잘못된 접근입니다. 스튜디오 ID 또는 사용자 정보가 없습니다.')
         return
      }

      const formData = new FormData()
      if (imgFile) {
         const encodedFile = new File([imgFile], encodeURIComponent(imgFile.name), {
            type: imgFile.type,
         })
         formData.append('image', encodedFile)
      }
      formData.append('title', title)
      formData.append('contents', contents)
      formData.append('studioId', studioId)
      formData.append('userId', userId)

      try {
         await dispatch(createCommunityThunk(formData)).unwrap()
         navigate(`/studio`)
      } catch (error) {
         console.error('게시글 등록 실패:', error)
      }
   }, [dispatch, title, contents, imgFile, navigate, studioId, userId])

   return (
      <Box sx={{ maxWidth: '800px', margin: 'auto', mt: 5 }}>
         <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
            글 작성하기
         </Typography>

         <Box sx={{ mb: 2 }}>
            <TextField fullWidth label="제목을 입력해주세요." variant="outlined" value={title} onChange={(e) => setTitle(e.target.value)} />
         </Box>

         <Box sx={{ mb: 2 }}>
            {image && (
               <Box sx={{ position: 'relative', display: 'inline-block', mt: 2 }}>
                  <CardMedia component="img" image={image} alt="첨부 이미지" sx={{ borderRadius: 2, maxHeight: 300, objectFit: 'contain' }} />
                  <IconButton
                     sx={{
                        position: 'absolute',
                        top: 5,
                        right: 5,
                        background: 'rgba(0, 0, 0, 0.5)',
                        color: 'white',
                     }}
                     onClick={handleRemoveImage}
                  >
                     <CloseIcon />
                  </IconButton>
               </Box>
            )}
         </Box>

         <Box sx={{ mb: 2 }}>
            <TextField fullWidth multiline rows={6} label="내용을 입력해주세요." variant="outlined" value={contents} onChange={(e) => setContents(e.target.value)} />
         </Box>

         {error && (
            <Typography variant="body2" color="error" sx={{ mb: 2 }}>
               {error}
            </Typography>
         )}

         <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button variant="outlined" startIcon={<ImageIcon />} component="label">
               이미지 첨부
               <input type="file" hidden onChange={handleImageChange} />
            </Button>
            <Button variant="contained" color="primary" onClick={handlePostSubmit}>
               등록
            </Button>
            <Button variant="outlined" onClick={() => navigate(`/studio/${studioId}`)}>
               취소
            </Button>
         </Box>
      </Box>
   )
}

export default CommunityForm
