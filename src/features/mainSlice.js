import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { showBanner, showProjects } from '../api/mainApi'

// 배너 프로젝트 호출
export const fetchShowBannerThunk = createAsyncThunk('main/fetchShowBanner', async (_, { rejectWithValue }) => {
   try {
      const response = await showBanner()
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '배너 불러오기 실패')
   }
})

// 프로젝트 목록 호출
export const fetchShowProjectsThunk = createAsyncThunk('main/fetchShowProjects', async (type, { rejectWithValue }) => {
   try {
      const response = await showProjects(type)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '프로젝트 불러오기 실패')
   }
})

const mainSlice = createSlice({
   name: 'main',
   initialState: {
      projects: [],
      banners: [],
      loading: false,
      pagination: null,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      // 배너 프로젝트 불러오기
      builder
         .addCase(fetchShowBannerThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchShowBannerThunk.fulfilled, (state, action) => {
            state.loading = false
            state.banners = action.payload.banners
         })
         .addCase(fetchShowBannerThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
      // 프로젝트 목록 불러오기
      builder
         .addCase(fetchShowProjectsThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchShowProjectsThunk.fulfilled, (state, action) => {
            state.loading = false
            state.projects = action.payload.projects
            state.pagination = action.payload.pagination
         })
         .addCase(fetchShowProjectsThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default mainSlice.reducer
