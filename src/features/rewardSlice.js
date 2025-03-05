import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getReward, createProduct, updateProduct, deleteProduct, createReward, updateReward, deleteReward } from '../api/rewardApi'

// 특정 프로젝트의 선물 구성 조회
export const fetchRewardThunk = createAsyncThunk('project/getReward', async (projectId, { rejectWithValue }) => {
   try {
      const response = await getReward(projectId)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '프로젝트 불러오기 실패')
   }
})

// 선물 구성품 생성
export const createProductThunk = createAsyncThunk('project/createProduct', async ({ projectId, productData }, { rejectWithValue }) => {
   try {
      const response = await createProduct(projectId, productData)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '선물 구성품 생성 실패')
   }
})

// 선물 구성품 수정
export const updateProductThunk = createAsyncThunk('project/updateProduct', async ({ productId, productData }, { rejectWithValue }) => {
   try {
      const response = await updateProduct(productId, productData)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '선물 구성품 수정 실패')
   }
})

// 선물 구성품 삭제
export const deleteProductThunk = createAsyncThunk('project/deleteProduct', async (productId, { rejectWithValue }) => {
   try {
      const response = await deleteProduct(productId)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '선물 구성품 수정 실패')
   }
})

// 후원 선물 생성
export const createRewardThunk = createAsyncThunk('project/createReward', async ({ projectId, rewardData }, { rejectWithValue }) => {
   try {
      const response = await createReward(projectId, rewardData)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '선물 구성품 생성 실패')
   }
})

// 후원 선물 수정
export const updateRewardThunk = createAsyncThunk('project/updateReward', async ({ rewardId, rewardData }, { rejectWithValue }) => {
   try {
      const response = await updateReward(rewardId, rewardData)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '선물 구성품 수정 실패')
   }
})

// 후원 선물 삭제
export const deleteRewardThunk = createAsyncThunk('project/deleteReward', async (rewardId, { rejectWithValue }) => {
   try {
      const response = await deleteReward(rewardId)
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
      reward: [],
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchRewardThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchRewardThunk.fulfilled, (state, action) => {
            state.loading = false
            state.reward = action.payload.reward.Rewards
         })
         .addCase(fetchRewardThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         // 선물 구성품 생성
         .addCase(createProductThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(createProductThunk.fulfilled, (state) => {
            state.loading = false
         })
         .addCase(createProductThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         // 선물 구성품 수정
         .addCase(updateProductThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(updateProductThunk.fulfilled, (state) => {
            state.loading = false
         })
         .addCase(updateProductThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         // 선물 구성품 삭제
         .addCase(deleteProductThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(deleteProductThunk.fulfilled, (state) => {
            state.loading = false
         })
         .addCase(deleteProductThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         // 후원 선물 생성
         .addCase(createRewardThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(createRewardThunk.fulfilled, (state) => {
            state.loading = false
         })
         .addCase(createRewardThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         // 후원 선물 수정
         .addCase(updateRewardThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(updateRewardThunk.fulfilled, (state) => {
            state.loading = false
         })
         .addCase(updateRewardThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         // 후원 선물 삭제
         .addCase(deleteRewardThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(deleteRewardThunk.fulfilled, (state) => {
            state.loading = false
         })
         .addCase(deleteRewardThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default rewardSlice.reducer
