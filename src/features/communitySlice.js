import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { showCommunities, getCommunityById, createCommunity, updateCommunity, deleteCommunity } from '../api/communityApi'

// 특정 글 조회
export const fetchCommunityByIdThunk = createAsyncThunk('community/fetchCommunityById', async (id, { rejectWithValue }) => {
   try {
      const response = await getCommunityById(id)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '커뮤니티 글 불러오기 실패')
   }
})

// 커뮤니티 글 목록 조회
export const fetchShowCommunitiesThunk = createAsyncThunk('community/fetchShowCommunities', async (data, { rejectWithValue }) => {
   try {
      const response = await showCommunities(data)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '커뮤니티 목록 불러오기 실패')
   }
})

// 커뮤니티 글 등록
export const createCommunityThunk = createAsyncThunk('community/createCommunity', async (communityData, { rejectWithValue }) => {
   try {
      const response = await createCommunity(communityData)
      return response.data.community
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '커뮤니티 글 등록 실패')
   }
})

// 커뮤니티 글 수정
export const updateCommunityThunk = createAsyncThunk('community/updateCommunity', async ({ id, communityData }, { rejectWithValue }) => {
   try {
      const response = await updateCommunity(id, communityData)
      return response.data.community
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '커뮤니티 글 수정 실패')
   }
})

// 커뮤니티 글 삭제
export const deleteCommunityThunk = createAsyncThunk('community/deleteCommunity', async (id, { rejectWithValue }) => {
   try {
      await deleteCommunity(id)
      return id // 삭제된 커뮤니티 ID만 반환
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '커뮤니티 글 삭제 실패')
   }
})

const communitySlice = createSlice({
   name: 'community',
   initialState: {
      communities: [],
      community: {},
      loading: false,
      error: null,
   },
   reducers: {},

   extraReducers: (builder) => {
      builder
         // 커뮤니티 목록 가져오기
         .addCase(fetchShowCommunitiesThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchShowCommunitiesThunk.fulfilled, (state, action) => {
            state.loading = false
            state.communities = action.payload.communities
            state.error = null
         })
         .addCase(fetchShowCommunitiesThunk.rejected, (state, action) => {
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
