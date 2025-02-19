import { configureStore } from '@reduxjs/toolkit'
import listReducer from '../features/listSlice'
import authReducer from '../features/authSlice'
import indexReducer from '../features/indexSlice'
import communityReducer from '../features/communitySlice'
import commentReducer from '../features/commentSlice'
import studioReducer from '../features/studioSlice'
import rankReducer from '../features/rankSlice'
import adminReducer from '../features/adminSlice'
import pageReducer from '../features/pageSlice'
import fundingReducer from '../features/fundingSlice'
import creatorReducer from '../features/creatorSlice'
import pageReducer from '../features/pageSlice'

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
      page: pageReducer,
      funding: fundingReducer,
      creator: creatorReducer,
   },
})

export default store
