import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createRewardProduct, updateRewardProduct } from '../api/rewardApi'

// 선물 구성품 생성
export const createRewardProductThunk = createAsyncThunk('project/createRewardProduct', async ({ projectId, productData }, { rejectWithValue }) => {
   try {
      const response = await createRewardProduct(projectId, productData)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '선물 구성품 생성 실패')
   }
})

// 선물 구성품 수정
export const updateRewardProductThunk = createAsyncThunk('project/updateRewardProduct', async ({ productId, productData }, { rejectWithValue }) => {
   try {
      const response = await updateRewardProduct(productId, productData)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '선물 구성품 수정 실패')
   }
})

const rewardSlice = createSlice({
   name: 'reward',
   initialState: {
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         // 선물 구성품 생성
         .addCase(createRewardProductThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(createRewardProductThunk.fulfilled, (state) => {
            state.loading = false
         })
         .addCase(createRewardProductThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         // 선물 구성품 수정
         .addCase(updateRewardProductThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(updateRewardProductThunk.fulfilled, (state) => {
            state.loading = false
         })
         .addCase(updateRewardProductThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default rewardSlice.reducer
