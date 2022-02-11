import {configureStore} from '@reduxjs/toolkit';
import userSlice from './redux/slices/userSlice';
import userSignUpSlice from './redux/slices/userSignUpSlice';
import loadingSlice from './redux/slices/loadingSlice/index';
import toastSlice from './redux/slices/toastSlice/index';

const store = configureStore({
  reducer: {
    userSlice,
    userSignUpSlice,
    loadingSlice,
    toastSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
