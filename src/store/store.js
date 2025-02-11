import { configureStore } from '@reduxjs/toolkit'
import listReducer from '../features/listSlice'
import authReducer from '../features/authSlice'
import indexReducer from '../features/indexSlice'
import communityReducer from '../features/communitySlice'
import commentReducer from '../features/commentSlice'

const store = configureStore({
   reducer: {
      list: listReducer,
      auth: authReducer,
      index: indexReducer,
      community: communityReducer,
      comments: commentReducer,
   },
})

export default store
