import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getCreators, updateCreatorRole, addCreator, getUserByName } from '../api/creatorApi'

// 창작자 목록 조회
export const fetchCreatorsThunk = createAsyncThunk('creator/fetchCreatorsThunk', async (_, { rejectWithValue }) => {
   try {
      const response = await getCreators()
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '창작자 목록 불러오기 실패')
   }
})

// 창작자 권한 업데이트
export const updateCreatorRoleThunk = createAsyncThunk('creator/updateCreatorRoleThunk', async ({ id, updatedData }, { rejectWithValue }) => {
   try {
      const response = await updateCreatorRole(id, updatedData)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '창작자 권한 업데이트 실패')
   }
})

// 창작자 추가 기능
export const addCreatorThunk = createAsyncThunk('creator/addCreatorThunk', async ({ name, role, studioId }, { rejectWithValue }) => {
   try {
      const response = await addCreator({ name, role, studioId })
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '창작자 추가 실패')
   }
})

const creatorSlice = createSlice({
   name: 'creator',
   initialState: {
      creators: [],
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         // 창작자 목록 조회
         .addCase(fetchCreatorsThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchCreatorsThunk.fulfilled, (state, action) => {
            state.loading = false
            state.creators = action.payload.creators
         })
         .addCase(fetchCreatorsThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         // 창작자 권한 업데이트
         .addCase(updateCreatorRoleThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(updateCreatorRoleThunk.fulfilled, (state, action) => {
            state.loading = false
            const updatedCreatorIndex = state.creators.findIndex((creator) => creator.id === action.payload.creator.id)
            if (updatedCreatorIndex !== -1) {
               state.creators[updatedCreatorIndex] = action.payload.creator
            }
         })
         .addCase(updateCreatorRoleThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         // 창작자 추가
         .addCase(addCreatorThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(addCreatorThunk.fulfilled, (state, action) => {
            state.loading = false
            state.creators.push(action.payload.creator)
         })
         .addCase(addCreatorThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default creatorSlice.reducer
