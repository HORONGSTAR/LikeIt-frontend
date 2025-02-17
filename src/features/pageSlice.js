import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getProfile } from '../api/pageApi'

// 내 프로필 정보 가져오기
export const getProfileThunk = createAsyncThunk('page/getProfile', async (_, { rejectWithValue }) => {
   try {
      const response = await getProfile()
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '프로필 정보 불러오기 실패')
   }
})

const pageSlice = createSlice({
   name: 'page',
   initialState: {
      user: null,
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      //내 프로필 가져오기
      builder
         .addCase(getProfileThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(getProfileThunk.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload.user
         })
         .addCase(getProfileThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default pageSlice.reducer
