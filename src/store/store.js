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
import projectReducer from '../features/projectSlice'
import rewardReducer from '../features/rewardSlice'
import orderReducer from '../features/orderSlice'
import timelineReducer from '../features/timelineSlice'
import messageReducer from '../features/messageSlice'

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
      project: projectReducer,
      reward: rewardReducer,
      funding: fundingReducer,
      creator: creatorReducer,
      order: orderReducer,
      timeline: timelineReducer,
      message: messageReducer,
   },
})

export default store
