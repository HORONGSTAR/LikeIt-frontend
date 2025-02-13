import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { showFollowStudios, showProjects } from '../api/listApi'

// 프로젝트 목록 호출
export const fetchShowProjectsThunk = createAsyncThunk('list/fetchShowProjects', async (data, { rejectWithValue }) => {
   try {
      const response = await showProjects(data)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '프로젝트 불러오기 실패')
   }
})

// 팔로우 스튜디오 호출
export const fetchShowFollowStudiosThunk = createAsyncThunk('list/fetchShowFollowStudios', async (data, { rejectWithValue }) => {
   try {
      const response = await showFollowStudios(data)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '팔로우 스튜디오 불러오기 실패')
   }
})

const listSlice = createSlice({
   name: 'list',
   initialState: {
      followUser: null,
      projects: [],
      count: 0,
      loading: false,
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
            state.count = action.payload.count
         })
         .addCase(fetchShowProjectsThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
      // 팔로우 목록 불러오기
      builder
         .addCase(fetchShowFollowStudiosThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchShowFollowStudiosThunk.fulfilled, (state, action) => {
            state.loading = false
            state.followUser = action.payload.followUser
            state.count = action.payload.count
         })
         .addCase(fetchShowFollowStudiosThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default listSlice.reducer
