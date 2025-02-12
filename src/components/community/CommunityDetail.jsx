import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card, CardContent, Typography, Avatar, Box, Button, TextField, Divider, IconButton } from '@mui/material'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import CommentIcon from '@mui/icons-material/Comment'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useParams } from 'react-router-dom'
import { fetchCommunityByIdThunk } from '../../features/communitySlice'
import { fetchCommentsThunk, createCommentThunk, updateCommentThunk, deleteCommentThunk } from '../../features/commentSlice'
import { LoadingBox } from '../../styles/BaseStyles'

const CommunityDetail = ({ onBack }) => {
   const { id } = useParams()
   const dispatch = useDispatch()
   const { community, loading } = useSelector((state) => state.community)
   const { comments, totalComments } = useSelector((state) => state.comments)
   const { user } = useSelector((state) => state.auth)

   const [newComment, setNewComment] = useState('')
   const [likes, setLikes] = useState(0)
   const [liked, setLiked] = useState(false)
   const [editingCommentId, setEditingCommentId] = useState(null)
   const [editingComment, setEditingComment] = useState('')
   const [page, setPage] = useState(1)
   const [totalPages, setTotalPages] = useState(1)

   useEffect(() => {
      dispatch(fetchCommunityByIdThunk(id))
      dispatch(fetchCommentsThunk({ communityId: id, page }))
   }, [dispatch, id, page])

   if (loading || !community) {
      return <LoadingBox />
   }

   // 댓글 등록
   const handleAddComment = () => {
      if (!newComment.trim()) return alert('댓글 내용을 입력해주세요.')
      dispatch(createCommentThunk({ communityId: id, comment: newComment }))
      setNewComment('')
   }

   // 댓글 수정
   const handleEdit = (id, content) => {
      setEditingCommentId(id)
      setEditingComment(content)
   }

   const saveEdit = () => {
      if (!editingComment.trim()) return alert('수정할 내용을 입력해주세요.')
      dispatch(updateCommentThunk({ commentId: editingCommentId, comment: editingComment }))
      setEditingCommentId(null)
      setEditingComment('')
   }

   // 댓글 삭제
   const handleDelete = (commentId) => {
      if (window.confirm('댓글을 삭제하시겠습니까?')) {
         dispatch(deleteCommentThunk(commentId))
      }
   }

   // 좋아요 토글
   const handleLikeToggle = () => {
      setLiked((prev) => !prev)
      setLikes((prev) => (liked ? prev - 1 : prev + 1))
   }

   // 날짜 변환
   const formattedDate = community?.createdAt ? format(new Date(community.createdAt), 'yyyy년 M월 d일 HH시 mm분', { locale: ko }) : ''

   return (
      <Card sx={{ p: 3, boxShadow: 'none', border: '1px solid #ccc' }}>
         <CardContent sx={{ width: '100%' }}>
            <Button onClick={onBack} sx={{ mb: 2 }}>
               ← 목록으로 돌아가기
            </Button>

            {/* 게시글 정보 */}
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
               {community?.title || '제목 없음'}
            </Typography>
            <Divider sx={{ my: 2, borderColor: '#ddd' }} />
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
               <Avatar src={community?.User?.imgUrl || '/images/default-profile.jpg'} sx={{ width: 40, height: 40, mr: 1 }} />
               <Typography variant="subtitle2" color="text.secondary">
                  {community?.User?.name || '닉네임 없음'}
                  <br />
                  {formattedDate}
               </Typography>
            </Box>

            {/* 본문 내용 */}
            <Typography variant="body1" sx={{ m: 3 }}>
               {community?.contents || '내용 없음'}
            </Typography>

            {/* 공감 & 댓글 */}
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
               <IconButton onClick={handleLikeToggle} color={liked ? 'error' : 'default'}>
                  {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
               </IconButton>
               <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#666', mr: 2 }}>
                  {likes}
               </Typography>
               <CommentIcon sx={{ color: '#666', mr: 1 }} />
               <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#666' }}>
                  {totalComments}
               </Typography>
            </Box>

            {/* 댓글 입력창 */}
            <Box sx={{ display: 'flex', mt: 3 }}>
               <TextField fullWidth placeholder="댓글을 입력하세요..." value={newComment} onChange={(e) => setNewComment(e.target.value)} variant="outlined" />
               <Button variant="contained" sx={{ ml: 1 }} onClick={handleAddComment}>
                  등록
               </Button>
            </Box>

            {/* 댓글 목록 */}
            <Box sx={{ mt: 3 }}>
               {comments.length > 0 ? (
                  comments.map((comment) => (
                     <Box key={comment.id} sx={{ display: 'flex', alignItems: 'center', mb: 2, p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
                        <Avatar src={comment.profile || '/images/default-profile.jpg'} sx={{ width: 32, height: 32, mr: 1 }} />
                        <Box sx={{ flex: 1 }}>
                           <Typography variant="subtitle2">{comment.User?.name || '익명'}</Typography>
                           <Typography variant="body2" color="text.secondary">
                              {format(new Date(comment.createdAt), 'yyyy년 M월 d일 HH시 mm분', { locale: ko })}
                           </Typography>
                           {editingCommentId === comment.id ? <TextField fullWidth value={editingComment} onChange={(e) => setEditingComment(e.target.value)} size="small" /> : <Typography variant="body1">{comment.comment}</Typography>}
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                           {editingCommentId === comment.id ? (
                              <>
                                 <Button variant="contained" onClick={saveEdit} size="small">
                                    저장
                                 </Button>
                                 <Button variant="outlined" onClick={() => setEditingCommentId(null)} size="small">
                                    취소
                                 </Button>
                              </>
                           ) : (
                              <>
                                 <IconButton onClick={() => handleEdit(comment.id, comment.comment)}>
                                    <EditIcon />
                                 </IconButton>
                                 <IconButton onClick={() => handleDelete(comment.id)}>
                                    <DeleteIcon />
                                 </IconButton>
                              </>
                           )}
                        </Box>
                     </Box>
                  ))
               ) : (
                  <Typography variant="body2" color="text.secondary">
                     댓글이 없습니다.
                  </Typography>
               )}
            </Box>
         </CardContent>
      </Card>
   )
}

export default CommunityDetail
