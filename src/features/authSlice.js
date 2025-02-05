import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { registerUser } from '../api/authApi'

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

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {},
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
  },
})
