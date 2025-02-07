import React, { useState } from 'react'
import { Card, CardMedia, CardContent, Typography, Avatar, Box, Button, TextField, Stack, Divider, IconButton } from '@mui/material'
import dayjs from 'dayjs'
import CommentIcon from '@mui/icons-material/Comment'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import ImageIcon from '@mui/icons-material/Image'
import CloseIcon from '@mui/icons-material/Close'

// 사용자 역할을 가져오는 훅 (임시 예제)
const useAuth = () => {
   return { userRole: 'creator' } // 'creator' 또는 'supporter' (창작자/후원자)
}

const CommunityDetail = ({ post, onBack, onUpdate }) => {
   const { userRole } = useAuth() // 현재 로그인한 사용자 역할 가져오기
   const [commentText, setCommentText] = useState('')
   const [comments, setComments] = useState(post.comments)
   const [likes, setLikes] = useState(post.likes || 0) // 초기 공감 수
   const [liked, setLiked] = useState(false) // 공감 여부 상태
   const [isEditing, setIsEditing] = useState(false)
   const [editedTitle, setEditedTitle] = useState(post.title)
   const [editedContent, setEditedContent] = useState(post.content)
   const [imageFile, setImageFile] = useState(null) // 새로 추가된 이미지
   const [imagePreview, setImagePreview] = useState(post.image || '') // 이미지 미리보기

   // 댓글 추가
   const handleAddComment = () => {
      if (commentText.trim() === '') return

      const newComment = {
         id: comments.length + 1,
         author: userRole === 'creator' ? '창작자' : '후원자',
         profile: '/images/default-profile.jpg',
         date: dayjs().format('YYYY-MM-DD HH:mm'),
         content: commentText,
      }

      setComments([...comments, newComment])
      setCommentText('')
   }

   // 공감 버튼 핸들러
   const handleLikeToggle = () => {
      setLiked((prev) => !prev)
      setLikes((prev) => (liked ? prev - 1 : prev + 1))
   }

   // 수정 버튼 핸들러
   const handleEdit = () => {
      setIsEditing(true)
   }

   // 이미지 업로드 핸들러
   const handleImageUpload = (e) => {
      const file = e.target.files[0]
      if (file) {
         setImageFile(file)
         setImagePreview(URL.createObjectURL(file)) // 미리보기 설정
      }
   }

   // 이미지 삭제 핸들러
   const handleImageRemove = () => {
      setImageFile(null)
      setImagePreview('')
   }

   // 저장 버튼 핸들러
   const handleSave = () => {
      const updatedPost = { ...post, title: editedTitle, content: editedContent, image: imagePreview }
      onUpdate(updatedPost)
      setIsEditing(false)
   }

   return (
      <Card sx={{ p: 3, boxShadow: 'none', border: '1px solid #ccc' }}>
         <CardContent>
            <Button onClick={onBack} sx={{ mb: 2 }}>
               ← 목록으로 돌아가기
            </Button>

            {/* 창작자만 수정 & 삭제 버튼 가능 */}
            {userRole === 'creator' && !isEditing && (
               <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                  <Button variant="outlined" startIcon={<EditIcon />} onClick={handleEdit}>
                     수정
                  </Button>
                  <Button variant="contained" color="error" startIcon={<DeleteIcon />}>
                     삭제
                  </Button>
               </Box>
            )}

            {/* 게시글 정보 */}
            {isEditing ? (
               <TextField fullWidth variant="outlined" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} sx={{ mb: 2 }} />
            ) : (
               <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
                  {post.title}
               </Typography>
            )}
            <Divider sx={{ my: 2, borderColor: '#ddd' }} />
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
               <Avatar src={post.profile} sx={{ width: 40, height: 40, mr: 1 }} />
               <Typography variant="subtitle2" color="text.secondary">
                  {post.author} · {post.date}
               </Typography>
            </Box>

            {/* 이미지 미리보기 */}
            {imagePreview && (
               <Box sx={{ position: 'relative', mt: 2, display: 'inline-block' }}>
                  <CardMedia component="img" image={imagePreview} alt="게시글 이미지" sx={{ borderRadius: 2, maxHeight: 400, objectFit: 'contain' }} />
                  {isEditing && (
                     <IconButton
                        sx={{
                           position: 'absolute',
                           top: 5,
                           right: 5,
                           backgroundColor: 'rgba(0,0,0,0.5)',
                           color: 'white',
                        }}
                        onClick={handleImageRemove}
                     >
                        <CloseIcon />
                     </IconButton>
                  )}
               </Box>
            )}

            {/* 본문 내용 */}
            {isEditing ? (
               <TextField fullWidth multiline rows={4} variant="outlined" value={editedContent} onChange={(e) => setEditedContent(e.target.value)} sx={{ mt: 2 }} />
            ) : (
               <Typography variant="body1" sx={{ m: 3 }}>
                  {post.content}
               </Typography>
            )}

            {/* 이미지 첨부, 저장, 취소 버튼 */}
            {isEditing && (
               <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
                  <input type="file" id="imageUpload" accept="image/*" hidden onChange={handleImageUpload} />
                  <Button variant="outlined" startIcon={<ImageIcon />} component="label" htmlFor="imageUpload">
                     이미지 첨부
                  </Button>
                  <Button variant="contained" color="primary" onClick={handleSave}>
                     저장
                  </Button>
                  <Button variant="outlined" color="error" onClick={() => setIsEditing(false)}>
                     취소
                  </Button>
               </Box>
            )}

            {/* 수정 모드가 아닐 때만 보이는 공감 & 댓글 */}
            {!isEditing && (
               <>
                  <Box sx={{ display: 'flex', alignItems: 'center', m: 1, mt: 4 }}>
                     <CommentIcon sx={{ color: '#666', mr: 1 }} />
                     <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#666' }}>
                        {comments.length}
                     </Typography>
                     <IconButton onClick={handleLikeToggle} color={liked ? 'error' : 'default'}>
                        {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                     </IconButton>
                     <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#666' }}>
                        {likes}
                     </Typography>
                  </Box>
               </>
            )}
         </CardContent>
      </Card>
   )
}

export default CommunityDetail
