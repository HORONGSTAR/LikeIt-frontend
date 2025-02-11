import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createCommentApi, updateComment, deleteComment, getComments } from '../api/communityApi'

// 댓글 가져오기
export const fetchCommentsThunk = createAsyncThunk('comments/fetchComments', async ({ communityId, page = 1 }, { rejectWithValue }) => {
   try {
      return await getComments(communityId, page)
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '댓글 가져오기 실패')
   }
})

// 댓글 등록
export const createCommentThunk = createAsyncThunk('comments/createComment', async ({ communityId, comment }, { rejectWithValue }) => {
   try {
      return await createCommentApi(communityId, comment)
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '댓글 등록 실패')
   }
})

// 댓글 수정
export const updateCommentThunk = createAsyncThunk('comments/updateComment', async ({ commentId, comment }, { rejectWithValue }) => {
   try {
      return await updateComment(commentId, comment)
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '댓글 수정 실패')
   }
})

// 댓글 삭제
export const deleteCommentThunk = createAsyncThunk('comments/deleteComment', async (commentId, { rejectWithValue }) => {
   try {
      return await deleteComment(commentId)
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '댓글 삭제 실패')
   }
})

const commentSlice = createSlice({
   name: 'comments',
   initialState: {
      comments: [],
      totalComments: 0, // 댓글 수
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchCommentsThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchCommentsThunk.fulfilled, (state, action) => {
            state.loading = false
            state.comments = action.payload.comments // 댓글 리스트
            state.totalComments = action.payload.totalComments || action.payload.comments.length // 댓글 수 업데이트
         })
         .addCase(fetchCommentsThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         .addCase(createCommentThunk.fulfilled, (state, action) => {
            state.comments.push(action.payload)
            state.totalComments += 1 // 댓글 수 증가
         })
         .addCase(updateCommentThunk.fulfilled, (state, action) => {
            const index = state.comments.findIndex((comment) => comment.id === action.payload.id)
            if (index !== -1) {
               state.comments[index] = action.payload
            }
         })
         .addCase(deleteCommentThunk.fulfilled, (state, action) => {
            state.comments = state.comments.filter((comment) => comment.id !== action.payload)
            state.totalComments -= 1 // 댓글 수 감소
         })
   },
})

export default commentSlice.reducer
