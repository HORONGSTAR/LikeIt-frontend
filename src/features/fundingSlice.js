import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getFunding } from '../api/fundingApi'

// 특정 펀딩 프로젝트 가져오기
export const fetchFundingThunk = createAsyncThunk('funding/fetchFunding', async (id, { rejectWithValue }) => {
   try {
      const response = await getFunding(id)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '특정 프로젝트 불러오기 실패')
   }
})

const fundingSlice = createSlice({
   name: 'funding',
   initialState: {
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
   },
})

export default fundingSlice.reducer
