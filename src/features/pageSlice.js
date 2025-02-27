import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getProfile, updateProfile, updateCategory } from '../api/pageApi'
import { data } from 'react-router-dom'

// 내 프로필 정보 가져오기
export const getProfileThunk = createAsyncThunk('page/getProfile', async (_, { rejectWithValue }) => {
   try {
      const response = await getProfile()
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '프로필 정보 불러오기 실패')
   }
})

//내 프로필 정보 변경
export const updateProfileThunk = createAsyncThunk('page/updateProfile', async (data, { rejectWithValue }) => {
   try {
      const response = await updateProfile(data)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '프로필정보 변경 실패')
   }
})

//카테고리 변경
export const updateCategoryThunk = createAsyncThunk('page/updateCategory', async (selectedValues, { rejectWithValue }) => {
   try {
      const response = await updateCategory(selectedValues)
      return response
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '카테고리 변경 실패')
   }
})

const pageSlice = createSlice({
   name: 'page',
   initialState: {
      user: null,
      loading: false,
      error: null,
      orders: [],
      points: [],
      profits: [],
      allprojects: [],
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
            state.orders = action.payload.orders
            state.points = action.payload.points
            state.profits = action.payload.profits
            state.allprojects = action.payload.allProjects
         })
         .addCase(getProfileThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
      //프로필 수정
      builder
         .addCase(updateProfileThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(updateProfileThunk.fulfilled, (state, action) => {
            state.loading = false
            // state.user = action.payload.user
         })
         .addCase(updateProfileThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
      //카테고리 변경
      builder
         .addCase(updateCategoryThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(updateCategoryThunk.fulfilled, (state, action) => {
            state.loading = false
            // state.user = action.payload.user
         })
         .addCase(updateCategoryThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default pageSlice.reducer
