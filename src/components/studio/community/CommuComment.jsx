import { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCommentsThunk, createCommentThunk, updateCommentThunk, deleteCommentThunk } from '../../../features/commentSlice'
import { Typography, Avatar, List, Button, Stack, InputBase, IconButton, Divider, ListItem, Box, CardContent, Pagination } from '@mui/material'
import { Create, Delete, Comment, CommentOutlined } from '@mui/icons-material'
import { LoadingBox, ErrorBox, Stack2 } from '../../../styles/BaseStyles'
import dayjs from 'dayjs'

const CommuComment = ({ communityId, auth }) => {
   const dispatch = useDispatch()
   const [open, setOpen] = useState(false)
   const [page, setPage] = useState(1)
   const [change, setChange] = useState(false)
   const [newComment, setNewComment] = useState('')
   const [openComments, setOpenComments] = useState(false)
   const [editComment, setEditComment] = useState('')
   const [editCommentId, setEditCommentId] = useState('')

   const { comments, pagination, loading, error } = useSelector((state) => state.comments)

   const handleEditComment = useCallback(
      (comment) => {
         if (!editCommentId) {
            setEditComment(comment.comment)
            setEditCommentId(comment.id)
         } else {
            dispatch(updateCommentThunk({ commentId: editCommentId, comment: editComment }))
               .unwrap()
               .then(() => {
                  setEditComment('')
                  setEditCommentId('')
                  setChange((prev) => !prev)
               })
               .catch(() => setOpen(true))
         }
      },
      [dispatch, editComment, editCommentId]
   )

   const handleDeleteComment = useCallback(
      (itemId) => {
         dispatch(deleteCommentThunk(itemId))
            .unwrap()
            .then(() => {
               setChange((prev) => !prev)
            })
            .catch(() => setOpen(true))
      },
      [dispatch]
   )

   const handleOnSubmit = useCallback(() => {
      dispatch(createCommentThunk({ communityId, comment: newComment }))
         .unwrap()
         .then(() => {
            setNewComment('')
            setChange((prev) => !prev)
         })
         .catch(() => setOpen(true))
   }, [dispatch, communityId, newComment])

   useEffect(() => {
      dispatch(fetchCommentsThunk({ communityId, page }))
   }, [dispatch, communityId, page, change])

   if (loading || !pagination || !comments) return <LoadingBox />

   return (
      <>
         <CardContent>
            <Stack2 onClick={() => setOpenComments(!openComments)}>
               <Button startIcon={openComments ? <Comment /> : <CommentOutlined />}>댓글({pagination.total})</Button>
            </Stack2>
         </CardContent>
         <CardContent sx={{ background: '#eee', display: openComments ? 'block' : 'none' }}>
            <Stack2 spacing={1} sx={{ background: '#fff', p: 1, borderRadius: 1 }}>
               <InputBase fullWidth placeholder="댓글 작성하기" value={newComment} onChange={(e) => setNewComment(e.target.value)} />
               <Button variant="contained" size="small" onClick={handleOnSubmit}>
                  등록
               </Button>
            </Stack2>
            {comments.map((comment) => (
               <List key={comment.id}>
                  <ListItem sx={{ py: 0 }}>
                     <Avatar src={process.env.REACT_APP_API_URL + '/userImg' + comment.User.imgUrl} sx={{ width: 32, height: 32, mr: 0.5 }} />
                     <Stack>
                        <Typography>{comment.User.name}</Typography>
                        <Typography variant="caption" color="grey">
                           {dayjs(comment.createdAt).format('YYYY-MM-DD HH:mm')}
                        </Typography>
                     </Stack>
                     {auth?.id === comment.userId && (
                        <Box ml="auto">
                           <IconButton aria-label="수정" size="small" onClick={() => handleEditComment(comment)}>
                              <Create fontSize="small" />
                           </IconButton>
                           <IconButton aria-label="삭제" size="small" onClick={() => handleDeleteComment(comment.id)}>
                              <Delete fontSize="small" />
                           </IconButton>
                        </Box>
                     )}
                  </ListItem>
                  <ListItem>
                     {editCommentId === comment.id ? (
                        <Stack2 spacing={1} sx={{ background: '#fff', p: 1, borderRadius: 1, width: '100%' }}>
                           <InputBase fullWidth placeholder="감상 작성하기" autoFocus value={editComment} onChange={(e) => setEditComment(e.target.value)} />
                        </Stack2>
                     ) : (
                        <Typography>{comment.comment}</Typography>
                     )}
                  </ListItem>
                  <Divider variant="middle" />
               </List>
            ))}
            <Stack alignItems="center">
               <Pagination count={pagination.totalPages} page={page} onChange={(e, value) => setPage(value)} />
            </Stack>
         </CardContent>
         <ErrorBox open={open} setOpen={setOpen} error={error} />
      </>
   )
}

export default CommuComment
