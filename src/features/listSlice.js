import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { showProjects } from '../api/listApi'

// 프로젝트 목록 호출
export const fetchShowProjectsThunk = createAsyncThunk('list/fetchShowProjects', async (type, { rejectWithValue }) => {
   try {
      const response = await showProjects(type)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '프로젝트 불러오기 실패')
   }
})

const listSlice = createSlice({
   name: 'list',
   initialState: {
      projects: [],
      loading: false,
      pagination: null,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
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

export default listSlice.reducer
