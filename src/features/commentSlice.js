import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createComment, updateComment, deleteComment, getComments } from '../api/commentApi'

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
      return await createComment(communityId, comment)
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
      pagination: null,
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchCommentsThunk.pending, (state) => {
            state.loading = true
         })
         .addCase(fetchCommentsThunk.fulfilled, (state, action) => {
            state.loading = false
            state.comments = action.payload.comments
            state.pagination = action.payload.pagination
         })
         .addCase(fetchCommentsThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         .addCase(createCommentThunk.pending, (state) => {
            state.loading = true
         })
         .addCase(createCommentThunk.fulfilled, (state) => {
            state.loading = false
         })
         .addCase(createCommentThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         .addCase(updateCommentThunk.pending, (state) => {
            state.loading = true
         })
         .addCase(updateCommentThunk.fulfilled, (state, action) => {
            state.loading = false
            state.comments = action.payload.comments
         })
         .addCase(updateCommentThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         .addCase(deleteCommentThunk.pending, (state) => {
            state.loading = true
         })
         .addCase(deleteCommentThunk.fulfilled, (state) => {
            state.loading = false
         })
         .addCase(deleteCommentThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default commentSlice.reducer
