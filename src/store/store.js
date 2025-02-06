import { configureStore } from '@reduxjs/toolkit'
import mainReducer from '../features/mainSlice'
import authReducer from '../features/authSlice'

const store = configureStore({
  reducer: {
    main: mainReducer,
    auth: authReducer,
  },
})

export default store
