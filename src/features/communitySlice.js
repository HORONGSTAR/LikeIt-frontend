import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getCommunity, getCommunityById, createCommunity, updateCommunity, deleteCommunity } from '../api/communityApi'

export const fetchCommunityByIdThunk = createAsyncThunk('community/fetchCommunityById', async (id, { rejectWithValue }) => {
   try {
      const response = await getCommunityById(id)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '커뮤니티 글 불러오기 실패')
   }
})

export const fetchCommunitiesThunk = createAsyncThunk('community/fetchCommunitiesThunk', async ({ page, limit }, { rejectWithValue }) => {
   try {
      const response = await getCommunity({ page, limit })
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '커뮤니티 목록 불러오기 실패')
   }
})

export const createCommunityThunk = createAsyncThunk('community/createCommunity', async (communityData, { rejectWithValue }) => {
   try {
      const response = await createCommunity(communityData)
      return response
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '커뮤니티 글 등록 실패')
   }
})

export const updateCommunityThunk = createAsyncThunk('community/updateCommunity', async ({ id, communityData }, { rejectWithValue }) => {
   try {
      const response = await updateCommunity(id, communityData)
      return response.data.community
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '커뮤니티 글 수정 실패')
   }
})

export const deleteCommunityThunk = createAsyncThunk('community/deleteCommunity', async (id, { rejectWithValue }) => {
   try {
      return await deleteCommunity(id)
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '커뮤니티 글 삭제 실패')
   }
})

const communitySlice = createSlice({
   name: 'community',
   initialState: {
      communities: [],
      community: null,
      loading: false,
      error: null,
   },
   reducers: {},

   extraReducers: (builder) => {
      builder
         // 커뮤니티 목록 가져오기
         .addCase(fetchCommunitiesThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchCommunitiesThunk.fulfilled, (state, action) => {
            state.loading = false
            state.communities = action.payload.communities
            state.error = null
         })
         .addCase(fetchCommunitiesThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })

         // 특정 커뮤니티 불러오기
         .addCase(fetchCommunityByIdThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchCommunityByIdThunk.fulfilled, (state, action) => {
            state.loading = false
            state.community = action.payload.community
         })
         .addCase(fetchCommunityByIdThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })

         // 커뮤니티 글 등록
         .addCase(createCommunityThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(createCommunityThunk.fulfilled, (state, action) => {
            state.loading = false
            state.community = action.payload
         })
         .addCase(createCommunityThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })

         // 커뮤니티 글 수정
         .addCase(updateCommunityThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(updateCommunityThunk.fulfilled, (state, action) => {
            state.loading = false
         })
         .addCase(updateCommunityThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         // 커뮤니티 글 삭제
         .addCase(deleteCommunityThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(deleteCommunityThunk.fulfilled, (state, action) => {
            state.loading = false
         })
         .addCase(deleteCommunityThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default communitySlice.reducer
