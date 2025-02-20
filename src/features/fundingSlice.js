import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getFunding, getTimeline, getTimelines, timelineCommentReg } from '../api/fundingApi'

// 특정 펀딩 프로젝트 가져오기
export const fetchFundingThunk = createAsyncThunk('funding/fetchFunding', async (id, { rejectWithValue }) => {
   try {
      const response = await getFunding(id)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '특정 프로젝트 불러오기 실패')
   }
})
// 타임라인 목록 호출
export const fetchTimelinesThunk = createAsyncThunk('funding/fetchTimelines', async (data, { rejectWithValue }) => {
   try {
      const response = await getTimelines(data)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '타임라인 목록 불러오기 실패')
   }
})
// 특정 타임라인 호출
export const fetchTimelineThunk = createAsyncThunk('funding/fetchTimeline', async (id, { rejectWithValue }) => {
   try {
      const response = await getTimeline(id)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '특정 프로젝트 불러오기 실패')
   }
})
// 타임라인 댓글 작성
export const timelineCommentRegThunk = createAsyncThunk('funding/timelineCommentReg', async (data, { rejectWithValue }) => {
   try {
      const response = await timelineCommentReg(data)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '타임라인 댓글 작성 실패')
   }
})

const fundingSlice = createSlice({
   name: 'funding',
   initialState: {
      timelines: [],
      count: 0,
      timeline: null,
      funding: null,
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      // 후원자 랭킹 불러오기
      builder
         .addCase(fetchFundingThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchFundingThunk.fulfilled, (state, action) => {
            state.loading = false
            state.funding = action.payload.funding
         })
         .addCase(fetchFundingThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
      // 타임라인 목록 호출
      builder
         .addCase(fetchTimelinesThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchTimelinesThunk.fulfilled, (state, action) => {
            state.loading = false
            state.timelines = action.payload.timelines
            state.count = action.payload.count
         })
         .addCase(fetchTimelinesThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
      // 타임라인 목록 호출
      builder
         .addCase(fetchTimelineThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchTimelineThunk.fulfilled, (state, action) => {
            state.loading = false
            state.timeline = action.payload.timeline
         })
         .addCase(fetchTimelineThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
      // 타임라인 댓글 작성
      builder
         .addCase(timelineCommentRegThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(timelineCommentRegThunk.fulfilled, (state, action) => {
            state.loading = false
         })
         .addCase(timelineCommentRegThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default fundingSlice.reducer
