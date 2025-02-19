import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getStudio, createStudio, updateStudio, getStudioById } from '../api/studioApi'

// 스튜디오 조회
export const fetchStudioThunk = createAsyncThunk('studio/fetchStudioThunk', async (_, { rejectWithValue }) => {
   try {
      const response = await getStudio()
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '스튜디오 불러오기 실패')
   }
})

// 스튜디오 생성
export const createStudioThunk = createAsyncThunk('studio/createStudioThunk', async (studioData, { rejectWithValue }) => {
   try {
      const response = await createStudio(studioData)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '스튜디오 생성 실패')
   }
})

// 특정 스튜디오 조회
export const fetchStudioByIdThunk = createAsyncThunk('studio/fetchStudioByIdThunk', async (studioId, { rejectWithValue }) => {
   try {
      const response = await getStudioById(studioId)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '스튜디오 불러오기 실패')
   }
})

// 스튜디오 수정
export const updateStudioThunk = createAsyncThunk('studio/updateStudioThunk', async ({ studioId, studioData }, { rejectWithValue }) => {
   try {
      const response = await updateStudio(studioId, studioData)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '스튜디오 수정 실패')
   }
})

const studioSlice = createSlice({
   name: 'studio',
   initialState: {
      studio: null,
      projects: null,
      loading: false,
      pagination: null,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         // 스튜디오 조회
         .addCase(fetchStudioThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchStudioThunk.fulfilled, (state, action) => {
            state.loading = false
            state.studio = action.payload.studio
            state.projects = action.payload.projects
         })
         .addCase(fetchStudioThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         // 스튜디오 생성
         .addCase(createStudioThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(createStudioThunk.fulfilled, (state, action) => {
            state.loading = false
            state.studio = action.payload.studio
         })
         .addCase(createStudioThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         // 특정 스튜디오 조회
         .addCase(fetchStudioByIdThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchStudioByIdThunk.fulfilled, (state, action) => {
            state.loading = false
            state.studio = action.payload.studio
            state.projects = action.payload.projects
         })
         .addCase(fetchStudioByIdThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         // 스튜디오 수정
         .addCase(updateStudioThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(updateStudioThunk.fulfilled, (state) => {
            state.loading = false
         })
         .addCase(updateStudioThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default studioSlice.reducer
