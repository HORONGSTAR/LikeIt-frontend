import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { bannerDel, bannerReg, proposalPass, proposalDeny, showAdminProjects } from '../api/adminApi'

// 관리자용 목록 호출
export const fetchShowAdminProjectsThunk = createAsyncThunk('admin/fetchShowAdminProjects', async (data, { rejectWithValue }) => {
   try {
      const response = await showAdminProjects(data)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '관리자용 목록 불러오기 실패')
   }
})

// 배너 등록
export const bannerRegThunk = createAsyncThunk('admin/bannerReg', async (data, { rejectWithValue }) => {
   try {
      const response = await bannerReg(data)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '배너 등록 실패')
   }
})

// 배너 해제
export const bannerDelThunk = createAsyncThunk('admin/bannerDel', async (id, { rejectWithValue }) => {
   try {
      const response = await bannerDel(id)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '배너 해제 실패')
   }
})

// 승인 허가
export const proposalPassThunk = createAsyncThunk('admin/proposalPass', async (id, { rejectWithValue }) => {
   try {
      const response = await proposalPass(id)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '승인 허가 실패')
   }
})

// 승인 거부
export const proposalDenyThunk = createAsyncThunk('admin/proposalDeny', async (data, { rejectWithValue }) => {
   try {
      const response = await proposalDeny(data)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '승인 거부 실패')
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
         .addCase(fetchShowAdminProjectsThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchShowAdminProjectsThunk.fulfilled, (state, action) => {
            state.loading = false
            state.projects = action.payload.projects
            state.count = action.payload.count
         })
         .addCase(fetchShowAdminProjectsThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
      // 배너 등록
      builder
         .addCase(bannerRegThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(bannerRegThunk.fulfilled, (state, action) => {
            state.loading = false
         })
         .addCase(bannerRegThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
      // 배너 해제
      builder
         .addCase(bannerDelThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(bannerDelThunk.fulfilled, (state, action) => {
            state.loading = false
         })
         .addCase(bannerDelThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
      // 승인 허가
      builder
         .addCase(proposalPassThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(proposalPassThunk.fulfilled, (state, action) => {
            state.loading = false
         })
         .addCase(proposalPassThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
      // 승인 거부
      builder
         .addCase(proposalDenyThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(proposalDenyThunk.fulfilled, (state, action) => {
            state.loading = false
         })
         .addCase(proposalDenyThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default adminSlice.reducer
