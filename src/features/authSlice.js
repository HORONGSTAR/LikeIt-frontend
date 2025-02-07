import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { loginUser, registerUser, logoutUser } from '../api/authApi'

// 회원가입 thunk
export const registerUserThunk = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await registerUser(userData)
      return response.data.user
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || '회원가입실패')
    }
  }
)

// 로그인 thunk
/* 
   credentials = {
      email = 'test@test.com',
      password = '1111'
   }

*/
export const loginUserThunk = createAsyncThunk(
  'auth/loginUser',
  async (Credentials, { rejectWithValue }) => {
    try {
      const response = await loginUser(Credentials)
      return response.data.user
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || '로그인 실패')
    }
  }
)

// 로그아웃 thunk , _(언더바)는 매개변수 값이 없을 떄 사용
export const logoutUserThunk = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await logoutUser()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || '로그아웃 실패')
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    //회원가입
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    //로그인
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.user = action.payload
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    //로그아웃
    builder
      .addCase(logoutUserThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.loading = false
        state.isAuthenticated = false
        state.user = null //로그아웃 후 유저정보 초기화
      })
      .addCase(logoutUserThunk.rejected, (state, action) => {
        state.loading = true
        state.error = action.payload
      })
  },
})

export default authSlice.reducer
