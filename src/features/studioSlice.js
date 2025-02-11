import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getStudio } from '../api/studioApi'

export const fetchStudioThunk = createAsyncThunk('studio/fetchStudioThunk', async (_, { rejectWithValue }) => {
   try {
      const response = await getStudio()
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '스튜디오 불러오기 실패')
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
   },
})

export default studioSlice.reducer
