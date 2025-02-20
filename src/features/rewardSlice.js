import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createProduct, updateProduct, deleteProduct } from '../api/rewardApi'

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
   },
})

export default rewardSlice.reducer
