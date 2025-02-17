import { configureStore } from '@reduxjs/toolkit'
import listReducer from '../features/listSlice'
import authReducer from '../features/authSlice'
import indexReducer from '../features/indexSlice'
import studioReducer from '../features/studioSlice'
import rankReducer from '../features/rankSlice'
import adminReducer from '../features/adminSlice'
import pageReducer from '../features/pageSlice'

const store = configureStore({
   reducer: {
      list: listReducer,
      auth: authReducer,
      index: indexReducer,
      studio: studioReducer,
      rank: rankReducer,
      admin: adminReducer,
      page: pageReducer,
   },
})

export default store
