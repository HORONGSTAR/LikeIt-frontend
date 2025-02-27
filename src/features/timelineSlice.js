import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createTimeline, updateTimeline, deleteTimeline } from '../api/timelineApi'

export const createTimelineThunk = createAsyncThunk('timeline/createTimeline', async (timelineData, { rejectWithValue }) => {
   try {
      const response = await createTimeline(timelineData)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '타임라인 글 등록 실패')
   }
})

export const updateTimelineThunk = createAsyncThunk('timeline/updateTimeline', async ({ id, timelineData }, { rejectWithValue }) => {
   try {
      const response = await updateTimeline(id, timelineData)
      return response.timeline
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '타임라인 글 수정 실패')
   }
})

export const deleteTimelineThunk = createAsyncThunk('timeline/deleteTimeline', async (id, { rejectWithValue }) => {
   try {
      return await deleteTimeline(id)
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '타임라인 글 삭제 실패')
   }
})

const timelineSlice = createSlice({
   name: 'timeline',
   initialState: {
      timeline: null,
      loading: false,
      error: null,
   },

   extraReducers: (builder) => {
      builder
         // 타임라인 글 등록
         .addCase(createTimelineThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(createTimelineThunk.fulfilled, (state, action) => {
            state.loading = false
            state.timeline = action.payload
         })
         .addCase(createTimelineThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })

         // 타임라인 글 수정
         .addCase(updateTimelineThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(updateTimelineThunk.fulfilled, (state) => {
            state.loading = false
         })
         .addCase(updateTimelineThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         // 타임라인 글 삭제
         .addCase(deleteTimelineThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(deleteTimelineThunk.fulfilled, (state) => {
            state.loading = false
         })
         .addCase(deleteTimelineThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default timelineSlice.reducer
