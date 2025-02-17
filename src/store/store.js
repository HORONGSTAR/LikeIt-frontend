import { configureStore } from '@reduxjs/toolkit'
import listReducer from '../features/listSlice'
import authReducer from '../features/authSlice'
import indexReducer from '../features/indexSlice'
import communityReducer from '../features/communitySlice'
import commentReducer from '../features/commentSlice'
import studioReducer from '../features/studioSlice'
import rankReducer from '../features/rankSlice'
import adminReducer from '../features/adminSlice'
import creatorReducer from '../features/creatorSlice'

const store = configureStore({
   reducer: {
      list: listReducer,
      auth: authReducer,
      index: indexReducer,
      community: communityReducer,
      comments: commentReducer,
      studio: studioReducer,
      rank: rankReducer,
      admin: adminReducer,
      creator: creatorReducer,
   },
})

export default store
