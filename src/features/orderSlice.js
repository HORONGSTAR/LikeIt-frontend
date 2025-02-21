import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchOrdersByProject, fetchOrderById, createOrder, updateOrderStatus, deleteOrder } from '../api/orderApi'

// 특정 프로젝트의 후원자 후원 목록 조회
export const fetchOrdersThunk = createAsyncThunk('order/fetchOrders', async (projectId, { rejectWithValue }) => {
   try {
      const response = await fetchOrdersByProject(projectId)
      return response
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '후원 목록 불러오기 실패')
   }
})

// 특정 후원 상세 조회
export const fetchOrderDetailThunk = createAsyncThunk('order/fetchOrderDetail', async (orderId, { rejectWithValue }) => {
   try {
      return await fetchOrderById(orderId)
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '후원 조회 실패')
   }
})

// 후원 생성
export const createNewOrderThunk = createAsyncThunk('order/createOrder', async (orderData, { rejectWithValue }) => {
   try {
      return await createOrder(orderData)
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '후원 생성 실패')
   }
})

// 후원 상태 업데이트
export const updateOrderThunk = createAsyncThunk('order/updateOrder', async ({ orderId, updateData }, { rejectWithValue }) => {
   try {
      return await updateOrderStatus(orderId, updateData)
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '후원 상태 업데이트 실패')
   }
})

// 후원 삭제
export const removeOrderThunk = createAsyncThunk('order/deleteOrder', async (orderId, { rejectWithValue }) => {
   try {
      return await deleteOrder(orderId)
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '후원 삭제 실패')
   }
})

const orderSlice = createSlice({
   name: 'order',
   initialState: {
      orders: [],
      orderDetail: null,
      giftStatistics: [],
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         // 후원 목록 조회
         .addCase(fetchOrdersThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchOrdersThunk.fulfilled, (state, action) => {
            state.loading = false
            state.orders = action.payload.orders
            state.giftStatistics = action.payload.giftStatistics
            state.totalSupporters = action.payload.totalSupporters || 0
            state.error = null
         })
         .addCase(fetchOrdersThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         // 후원 상세 조회
         .addCase(fetchOrderDetailThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchOrderDetailThunk.fulfilled, (state, action) => {
            state.loading = false
            state.orderDetail = action.payload.orderDetail
         })
         .addCase(fetchOrderDetailThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         // 후원 생성
         .addCase(createNewOrderThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(createNewOrderThunk.fulfilled, (state, action) => {
            state.loading = false
            state.orderDetail = action.payload
         })
         .addCase(createNewOrderThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         // 후원 상태 업데이트
         .addCase(updateOrderThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(updateOrderThunk.fulfilled, (state) => {
            state.loading = false
         })
         .addCase(updateOrderThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         // 후원 삭제
         .addCase(removeOrderThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(removeOrderThunk.fulfilled, (state) => {
            state.loading = false
         })
         .addCase(removeOrderThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default orderSlice.reducer
