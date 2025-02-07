import React, { useState } from 'react'
import { Card, CardMedia, CardContent, Typography, Avatar, Box, Button, TextField, Stack, Divider, IconButton } from '@mui/material'
import dayjs from 'dayjs'
import CommentIcon from '@mui/icons-material/Comment'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'

const now = dayjs()
console.log(now.format('YYYY년 MM월 DD일 HH시 mm분'))

const CommunityDetail = ({ post, onBack }) => {
   const [commentText, setCommentText] = useState('')
   const [comments, setComments] = useState(post.comments)
   const [likes, setLikes] = useState(post.likes || 0) // 초기 공감 수
   const [liked, setLiked] = useState(false) // 공감 여부 상태

   // 댓글 추가
   const handleAddComment = () => {
      if (commentText.trim() === '') return

      const newComment = {
         id: comments.length + 1,
         author: '후원자',
         profile: '/images/default-profile.jpg', // 기본 프로필 이미지
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

   return (
      <Card sx={{ p: 2, boxShadow: 'none', border: '1px solid #ccc' }}>
         <CardContent>
            <Button onClick={onBack} sx={{ mb: 2 }}>
               ← 목록으로 돌아가기
            </Button>

            {/* 게시글 정보 */}
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
               {post.title}
            </Typography>
            <Divider sx={{ my: 2, borderColor: '#ddd' }} />
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
               <Avatar src={post.profile} sx={{ width: 40, height: 40, mr: 1 }} />
               <Typography variant="subtitle2" color="text.secondary">
                  {post.author} · {post.date}
               </Typography>
            </Box>
            {/* 이미지가 있을 때만 렌더링 */}
            {post.image && <CardMedia component="img" image={post.image} alt="게시글 이미지" sx={{ mt: 2, borderRadius: 2, maxHeight: 400, objectFit: 'contain' }} />}
            <Typography variant="body1" sx={{ m: 3 }}>
               {post.content}
            </Typography>

            {/* 댓글, 공감 */}
            <Box sx={{ display: 'flex', alignItems: 'center', m: 1 }}>
               <CommentIcon sx={{ color: '#666', mr: 1 }} /> <span style={{ color: '#666', fontWeight: 'bold' }}>{comments.length}</span>
               <IconButton onClick={handleLikeToggle} color={liked ? 'error' : 'default'}>
                  {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
               </IconButton>
               <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#666' }}>
                  {likes}
               </Typography>
            </Box>

            {/* 댓글 목록 */}
            {comments.map((comment, index) => (
               <Box key={comment.id} sx={{ width: '100%', mb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                     <Avatar src={comment.profile} sx={{ width: 50, height: 50, mr: 1, objectFit: 'fill' }} />
                     <Box>
                        <Typography variant="subtitle2" fontWeight="bold">
                           {comment.author}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                           {comment.date}
                        </Typography>
                        <Typography variant="body2">{comment.content}</Typography>
                     </Box>
                  </Box>

                  {index < comments.length - 1 && <Divider sx={{ width: '100%', my: 2, borderColor: '#ddd' }} />}
               </Box>
            ))}

            {/* 댓글 작성 폼 (후원자만 가능) */}
            <Stack direction="row" sx={{ mt: 2 }} spacing={1}>
               <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  placeholder="댓글 작성하기"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  sx={{
                     '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                           borderColor: '#ccc', // 기본 테두리 색상
                        },
                        '&:hover fieldset': {
                           borderColor: '#888', // 마우스 오버 시 색상
                        },
                        '&.Mui-focused fieldset': {
                           border: '2px solid #666', // 클릭(포커스) 시 색상 변경
                        },
                     },
                  }}
               />
               <Button variant="contained" onClick={handleAddComment} sx={{ color: '#222', border: '1px solid #222', backgroundColor: 'white', boxShadow: 'none' }}>
                  등록
               </Button>
            </Stack>
         </CardContent>
      </Card>
   )
}

export default CommunityDetail
