import { configureStore } from '@reduxjs/toolkit'
import listReducer from '../features/listSlice'
import authReducer from '../features/authSlice'
import indexReducer from '../features/indexSlice'
import communityReducer from '../features/communitySlice'
import commentReducer from '../features/commentSlice'
import studioReducer from '../features/studioSlice'

const store = configureStore({
   reducer: {
      list: listReducer,
      auth: authReducer,
      index: indexReducer,
      community: communityReducer,
      comments: commentReducer,
      studio: studioReducer,
   },
})

export default store
