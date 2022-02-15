import orderSlice from './redux/slices/orderSlice/';
import categoriesSlice from './redux/slices/categoriesSlice/';
import provincesSlice from './redux/slices/provincesSlice/';
import {configureStore} from '@reduxjs/toolkit';
import userSlice from './redux/slices/userSlice';
import userSignUpSlice from './redux/slices/userSignUpSlice';
import loadingSlice from './redux/slices/loadingSlice';
import toastSlice from './redux/slices/toastSlice';
import deliveryAddressSlice from './redux/slices/deliveryAddressSlice';
import deliveryAddressLoadingSlice from './redux/slices/deliveryAddressLoadingSlice';
import orderCompletedSlice from './redux/slices/orderCompletedSlice';
import orderCompletedLoading from './redux/slices/orderCompletedLoading';
import orderUpcommingLoading from './redux/slices/orderUpcommingLoading';

const store = configureStore({
  reducer: {
    userSlice,
    userSignUpSlice,
    loadingSlice,
    toastSlice,
    deliveryAddressSlice,
    provincesSlice,
    deliveryAddressLoadingSlice,
    orderSlice,
    categoriesSlice,
    orderCompletedSlice,
    orderCompletedLoading,
    orderUpcommingLoading,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
