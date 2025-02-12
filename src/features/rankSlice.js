import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { showRanks, showMyRank } from '../api/rankApi'

// 후원자 랭킹 호출
export const fetchShowRanksThunk = createAsyncThunk('index/fetchShowRanks', async (_, { rejectWithValue }) => {
   try {
      const response = await showRanks()
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '후원자 랭킹 불러오기 실패')
   }
})

// 로그인 유저 통계 호출
export const fetchShowMyRankThunk = createAsyncThunk('index/fetchShowMyRank', async (id, { rejectWithValue }) => {
   try {
      const response = await showMyRank(id)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '로그인 유저 통계 불러오기 실패')
   }
})

const rankSlice = createSlice({
   name: 'rank',
   initialState: {
      myRank: null,
      ranks: [],
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
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
      // 로그인 유저 통계 불러오기
      builder
         .addCase(fetchShowMyRankThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchShowMyRankThunk.fulfilled, (state, action) => {
            state.loading = false
            state.myRank = action.payload.myRank
         })
         .addCase(fetchShowMyRankThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default rankSlice.reducer
