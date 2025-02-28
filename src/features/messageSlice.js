import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchMessages } from '../api/messageApi'

// 메시지 목록 호출
export const fetchMessagesThunk = createAsyncThunk('list/fetchMessages', async (data, { rejectWithValue }) => {
   try {
      const response = await fetchMessages(data)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '메시지 목록 호출 실패')
   }
})

const messageSlice = createSlice({
   name: 'message',
   initialState: {
      messages: [],
      count: 0,
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      // 메시지 목록 불러오기
      builder
         .addCase(fetchMessagesThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchMessagesThunk.fulfilled, (state, action) => {
            state.loading = false
            state.messages = action.payload.messages
            state.count = action.payload.count
         })
         .addCase(fetchMessagesThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default messageSlice.reducer
