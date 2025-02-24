import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getFunding, getReviews, getTimeline, getTimelines, reviewDel, reviewRecommendDel, reviewRecommendReg, reviewReg, timelineCommentDel, timelineCommentReg } from '../api/fundingApi'

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
// 타임라인 댓글 삭제
export const timelineCommentDelThunk = createAsyncThunk('funding/timelineCommentDel', async (id, { rejectWithValue }) => {
   try {
      const response = await timelineCommentDel(id)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '댓글 삭제 실패')
   }
})

// 리뷰 호출
export const fetchReviewsThunk = createAsyncThunk('funding/fetchReviews', async (data, { rejectWithValue }) => {
   try {
      const response = await getReviews(data)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '리뷰 목록 불러오기 실패')
   }
})

// 리뷰 추천
export const reviewRecommendRegThunk = createAsyncThunk('funding/reviewRecommendReg', async (id, { rejectWithValue }) => {
   try {
      const response = await reviewRecommendReg(id)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '리뷰 추천 실패')
   }
})

// 리뷰 추천 취소
export const reviewRecommendDelThunk = createAsyncThunk('funding/reviewRecommendDel', async (id, { rejectWithValue }) => {
   try {
      const response = await reviewRecommendDel(id)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '리뷰 추천 취소 실패')
   }
})

// 리뷰 등록
export const reviewRegThunk = createAsyncThunk('funding/reviewReg', async (data, { rejectWithValue }) => {
   try {
      const response = await reviewReg(data)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '리뷰 등록 실패')
   }
})

// 리뷰 삭제
export const reviewDelThunk = createAsyncThunk('funding/reviewDel', async (id, { rejectWithValue }) => {
   try {
      const response = await reviewDel(id)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '리뷰 삭제 실패')
   }
})

const fundingSlice = createSlice({
   name: 'funding',
   initialState: {
      timelines: [],
      reviews: [],
      reviewCount: null,
      timelineCount: 0,
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
            state.timelineCount = action.payload.timelineCount
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
      // 리뷰 목록 호출
      builder
         .addCase(fetchReviewsThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchReviewsThunk.fulfilled, (state, action) => {
            state.loading = false
            state.reviews = action.payload.reviews
            state.reviewCount = action.payload.reviewCount
         })
         .addCase(fetchReviewsThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
      // 리뷰 추천
      builder
         .addCase(reviewRecommendRegThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(reviewRecommendRegThunk.fulfilled, (state, action) => {
            state.loading = false
         })
         .addCase(reviewRecommendRegThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
      // 리뷰 추천 취소
      builder
         .addCase(reviewRecommendDelThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(reviewRecommendDelThunk.fulfilled, (state, action) => {
            state.loading = false
         })
         .addCase(reviewRecommendDelThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
      // 댓글 등록
      builder
         .addCase(reviewRegThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(reviewRegThunk.fulfilled, (state, action) => {
            state.loading = false
         })
         .addCase(reviewRegThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default fundingSlice.reducer
