import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { showBanner, showRanks } from '../api/indexApi'

// 배너 프로젝트 호출
export const fetchShowBannerThunk = createAsyncThunk('index/fetchShowBanner', async (_, { rejectWithValue }) => {
   try {
      const response = await showBanner()
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '배너 불러오기 실패')
   }
})
// 후원자 랭킹 호출
export const fetchShowRanksThunk = createAsyncThunk('index/fetchShowRanks', async (_, { rejectWithValue }) => {
   try {
      const response = await showRanks()
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '후원자 랭킹 불러오기 실패')
   }
})

const indexSlice = createSlice({
   name: 'index',
   initialState: {
      banners: [],
      ranks: [],
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
      // 후원자 랭킹 불러오기
      builder
         .addCase(fetchShowRanksThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchShowRanksThunk.fulfilled, (state, action) => {
            state.loading = false
            state.ranks = action.payload.ranks
         })
         .addCase(fetchShowRanksThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default indexSlice.reducer
