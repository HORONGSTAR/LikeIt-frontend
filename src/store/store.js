import { configureStore } from '@reduxjs/toolkit'
import listReducer from '../features/listSlice'
import authReducer from '../features/authSlice'
import indexReducer from '../features/indexSlice'
<<<<<<< HEAD
import communityReducer from '../features/communitySlice'
import commentReducer from '../features/commentSlice'
=======
import studioReducer from '../features/studioSlice'
>>>>>>> 925cab51882d4442cd97212e1b6478e4370ce7dd

const store = configureStore({
   reducer: {
      list: listReducer,
      auth: authReducer,
      index: indexReducer,
<<<<<<< HEAD
      community: communityReducer,
      comments: commentReducer,
=======
      studio: studioReducer,
>>>>>>> 925cab51882d4442cd97212e1b6478e4370ce7dd
   },
})

export default store
