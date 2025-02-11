import React, { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Card, CardContent, Typography, Avatar, Box, Button, TextField, Divider, IconButton } from '@mui/material'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import CommentIcon from '@mui/icons-material/Comment'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useParams } from 'react-router-dom'
import { getComments, createCommentApi, updateComment, deleteComment, getCommunityById } from '../../api/communityApi'
import { LoadingBox } from '../../styles/BaseStyles'

const CommunityDetail = ({ onBack }) => {
   const { id } = useParams()
   const [community, setCommunity] = useState({})
   const [newComment, setNewComment] = useState('')
   const [likes, setLikes] = useState(0)
   const [liked, setLiked] = useState(false)
   const [comments, setComments] = useState([])
   const [loading, setLoading] = useState(false)
   const [editingCommentId, setEditingCommentId] = useState(null)
   const [editingComment, setEditingComment] = useState('')
   const { user } = useSelector((state) => state.auth)
   const totalComments = useSelector((state) => state.comments.totalComments)
   const [page, setPage] = useState(1)
   const [totalPages, setTotalPages] = useState(1)

   const fetchCommunity = useCallback(async () => {
      try {
         const data = await getCommunityById(id)
         if (data && data.community) {
            setCommunity(data.community)
            setLikes(data.community.likes || 0)
         } else {
            setCommunity({})
         }
      } catch (error) {
         console.error('커뮤니티 데이터 로딩 실패:', error)
      }
   }, [id])

   const fetchComments = useCallback(
      async (currentPage) => {
         setLoading(true)
         try {
            const response = await getComments(id, currentPage, 5)
            setComments(response.comments)
            setPage(response.pagination.page)
            setTotalPages(response.pagination.totalPages)
         } catch (error) {
            console.error('댓글 불러오기 실패:', error)
         } finally {
            setLoading(false)
         }
      },
      [id]
   )

   // useEffect
   useEffect(() => {
      const fetchData = async () => {
         await fetchCommunity()
         await fetchComments(page)
      }

      fetchData()
   }, [fetchCommunity, fetchComments, page])

   if (!community) {
      return <LoadingBox />
   }

   // 댓글 등록
   const handleAddComment = async () => {
      if (!newComment.trim()) {
         alert('댓글 내용을 입력해주세요.')
         return
      }

      try {
         await createCommentApi(id, newComment)
         setNewComment('')
         fetchComments()
      } catch (error) {
         console.error('댓글 등록 실패:', error)
         alert('댓글 등록 중 문제가 발생했습니다.')
      }
   }

   // 댓글 수정
   const handleEdit = (id, content) => {
      setEditingCommentId(id)
      setEditingComment(content)
   }

   const saveEdit = async () => {
      if (!editingComment.trim()) {
         alert('수정할 내용을 입력해주세요.')
         return
      }

      try {
         await updateComment(editingCommentId, editingComment)
         alert('댓글이 수정되었습니다.')
         setEditingCommentId(null)
         setEditingComment('')
         fetchComments(page)
      } catch (error) {
         console.error('댓글 수정 실패:', error)
         alert('댓글 수정 중 문제가 발생했습니다.')
      }
   }

   // 댓글 삭제
   const handleDelete = async (id) => {
      if (window.confirm('댓글을 삭제하시겠습니까?')) {
         try {
            await deleteComment(id)
            alert('댓글이 삭제되었습니다.')
            fetchComments(page)
         } catch (error) {
            console.error('댓글 삭제 실패:', error)
         }
      }
   }

   // 페이지
   const handlePageChange = (newPage) => {
      if (newPage > 0 && newPage <= totalPages) {
         setPage(newPage)
      }
   }
   // 공감 버튼 토글
   const handleLikeToggle = () => {
      setLiked((prev) => !prev)
      setLikes((prev) => prev + (liked ? -1 : 1))
   }

   // 날짜 변환
   const formattedDate = community?.createdAt ? format(new Date(community.createdAt), 'yyyy년 M월 d일 HH시 mm분', { locale: ko }) : ''

   return (
      <>
         {community && (
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

                  {/* 댓글 입력창을 항상 표시하도록 `loading` 블록 밖으로 이동 */}
                  <Box sx={{ display: 'flex', mt: 3 }}>
                     <TextField fullWidth placeholder="댓글을 입력하세요..." value={newComment} onChange={(e) => setNewComment(e.target.value)} variant="outlined" />
                     <Button variant="contained" sx={{ ml: 1 }} onClick={handleAddComment}>
                        등록
                     </Button>
                  </Box>

                  {/* 로딩 중 표시 */}
                  {loading ? (
                     <LoadingBox />
                  ) : (
                     <>
                        {/* 댓글 목록 */}
                        <Box sx={{ mt: 3 }}>
                           {comments.length > 0 ? (
                              comments.map((comment) => {
                                 return (
                                    // <p>{comment.id}</p>
                                    <Box key={comment.id} sx={{ display: 'flex', alignItems: 'center', mb: 2, p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
                                       <Avatar src={comment.profile || '/images/default-profile.jpg'} sx={{ width: 32, height: 32, mr: 1 }} />
                                       <Box sx={{ flex: 1 }}>
                                          <Typography variant="subtitle2">{comment.User.name}</Typography>
                                          <Typography variant="body2" color="text.secondary">
                                             {format(new Date(comment.createdAt), 'yyyy년 M월 d일 HH시 mm분', { locale: ko })}
                                          </Typography>
                                          {editingCommentId === comment.id ? <TextField fullWidth value={editingComment} onChange={(e) => setEditingComment(e.target.value)} size="small" /> : <Typography variant="body1">{comment.comment}</Typography>}
                                       </Box>

                                       {/* 수정 및 삭제 버튼 */}
                                       {/* {comment.UserId === user.id && ( */}
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
                                       {/* )} */}

                                       <Box>
                                          <Button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
                                             이전
                                          </Button>
                                          <Typography>
                                             {page} / {totalPages > 0 ? totalPages : 1}
                                          </Typography>
                                          <Button onClick={() => handlePageChange(page + 1)} disabled={page >= totalPages}>
                                             다음
                                          </Button>
                                       </Box>
                                    </Box>
                                 )
                              })
                           ) : (
                              <Typography variant="body2" color="text.secondary">
                                 댓글이 없습니다.
                              </Typography>
                           )}
                        </Box>
                     </>
                  )}
               </CardContent>
            </Card>
         )}
      </>
   )
}

export default CommunityDetail
