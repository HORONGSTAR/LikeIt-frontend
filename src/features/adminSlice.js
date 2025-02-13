import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { showAdminProjects } from '../api/adminApi'

// 관리자용 목록 호출
export const fetchShowBannerThunk = createAsyncThunk('index/fetchShowBanner', async (_, { rejectWithValue }) => {
   try {
      const response = await showAdminProjects()
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '관리자용 목록 불러오기 실패')
   }
})

const adminSlice = createSlice({
   name: 'admin',
   initialState: {
      projects: [],
      count: null,
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      // 관리자용 프로젝트 목록 불러오기
      builder
         .addCase(fetchShowBannerThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchShowBannerThunk.fulfilled, (state, action) => {
            state.loading = false
            state.projects = action.payload.projects
            state.count = action.payload.count
         })
         .addCase(fetchShowBannerThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default adminSlice.reducer
