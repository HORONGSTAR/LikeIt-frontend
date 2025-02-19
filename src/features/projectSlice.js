import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createProject, updateProject, getProjectById } from '../api/projectApi'

// 프로젝트 생성
export const createProjectThunk = createAsyncThunk('project/createProject', async (projectData, { rejectWithValue }) => {
   try {
      const response = await createProject(projectData)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '프로젝트 생성 실패')
   }
})

// 프로젝트 수정
export const updateProjectThunk = createAsyncThunk('project/updateProject', async ({ projectId, projectData }, { rejectWithValue }) => {
   try {
      const response = await updateProject(projectId, projectData)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '프로젝트 수정 실패')
   }
})

// 특정 프로젝트 조회
export const fetchProjectByIdThunk = createAsyncThunk('project/getProjectById', async (projectId, { rejectWithValue }) => {
   try {
      const response = await getProjectById(projectId)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '프로젝트 불러오기 실패')
   }
})

const projectSlice = createSlice({
   name: 'project',
   initialState: {
      project: null,
      projects: null,
      loading: false,
      pagination: null,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         // 프로젝트 생성
         .addCase(createProjectThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(createProjectThunk.fulfilled, (state, action) => {
            state.loading = false
            state.project = action.payload
         })
         .addCase(createProjectThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         // 프로젝트 수정
         .addCase(updateProjectThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(updateProjectThunk.fulfilled, (state, action) => {
            state.loading = false
            state.project = action.payload.project
         })
         .addCase(updateProjectThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         // 특정 프로젝트 조회
         .addCase(fetchProjectByIdThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchProjectByIdThunk.fulfilled, (state, action) => {
            state.loading = false
            state.project = action.payload.project
         })
         .addCase(fetchProjectByIdThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default projectSlice.reducer
