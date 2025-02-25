import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { loginUser, registerUser, googleRegisterUser, logoutUser, checkAuthStatus, setTempPassword, changeEmail, changePassword, fetchEmail } from '../api/authApi'

// 회원가입 thunk
export const registerUserThunk = createAsyncThunk('auth/registerUser', async (userData, { rejectWithValue }) => {
   try {
      const response = await registerUser(userData)
      return response.data.user
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '회원가입실패')
   }
})

//구글계정으로 회원가입 thunk
export const googleRegisterUserThunk = createAsyncThunk('auth/googleRegisterUser', async (userData, { rejectWithValue }) => {
   try {
      const response = await googleRegisterUser(userData)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '구글계정으로 회원가입실패')
   }
})

// 로그인 thunk
/* 
   credentials = {
      email = 'test@test.com',
      password = '1111'
   }

*/
export const loginUserThunk = createAsyncThunk('auth/loginUser', async (Credentials, { rejectWithValue }) => {
   try {
      const response = await loginUser(Credentials)
      return response.data.user
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '로그인 실패')
   }
})

// 로그아웃 thunk , _(언더바)는 매개변수 값이 없을 떄 사용
export const logoutUserThunk = createAsyncThunk('auth/logoutUser', async (_, { rejectWithValue }) => {
   try {
      const response = await logoutUser()
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '로그아웃 실패')
   }
})

//로그인 상태확인
export const checkAuthStatusThunk = createAsyncThunk('auth/checkAuthStatus', async (_, { rejectWithValue }) => {
   try {
      const response = await checkAuthStatus()
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '상태 확인 실패')
   }
})

//임시비번 설정 및 보내주기
export const setTempPasswordThunk = createAsyncThunk('auth/setTempPassword', async (email, { rejectWithValue }) => {
   try {
      const response = await setTempPassword(email)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '임시 비번 설정 실패')
   }
})

//
export const fetchEmailThunk = createAsyncThunk('auth/fetchEmail', async (phone, { rejectWithValue }) => {
   try {
      const response = await fetchEmail(phone)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '이메일 가져오기 실패')
   }
})

//이메일 바꾸기
export const changeEmailThunk = createAsyncThunk('auth/changeEmail', async (email, { rejectWithValue }) => {
   try {
      const response = await changeEmail(email)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '이메일 변경 실패')
   }
})

//비밀번호 바꾸기
export const changePasswordThunk = createAsyncThunk('auth/changePassword', async (password, { rejectWithValue }) => {
   try {
      const response = await changePassword(password)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '비밀번호 변경 실패')
   }
})

const authSlice = createSlice({
   name: 'auth',
   initialState: {
      user: null,
      isAuthenticated: false,
      loading: true,
      error: null,
      email: null,
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
      //구글회원가입
      builder
         .addCase(googleRegisterUserThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(googleRegisterUserThunk.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
         })
         .addCase(googleRegisterUserThunk.rejected, (state, action) => {
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
            state.loading = false
            state.error = action.payload
         })
      //로그인 상태 확인
      builder
         .addCase(checkAuthStatusThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(checkAuthStatusThunk.fulfilled, (state, action) => {
            state.loading = false
            state.isAuthenticated = action.payload.isAuthenticated
            state.user = action.payload.user || null
         })
         .addCase(checkAuthStatusThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            state.isAuthenticated = false
            state.user = null
         })
      //임시비번 설정
      builder
         .addCase(setTempPasswordThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(setTempPasswordThunk.fulfilled, (state) => {
            state.loading = false
         })
         .addCase(setTempPasswordThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
      //이메일 변경
      builder
         .addCase(changeEmailThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(changeEmailThunk.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload.user || null
         })
         .addCase(changeEmailThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
      //비밀번호 변경
      builder
         .addCase(changePasswordThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(changePasswordThunk.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload.user || null
         })
         .addCase(changePasswordThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
      //이메일 가져오기
      builder
         .addCase(fetchEmailThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchEmailThunk.fulfilled, (state, action) => {
            state.loading = false
            state.email = action.payload.email
         })
         .addCase(fetchEmailThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default authSlice.reducer
