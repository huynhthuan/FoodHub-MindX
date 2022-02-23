import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

const couponAdapter = createEntityAdapter<any[]>({
  // Assume IDs are stored in a field other than `book.id`
  selectId: coupon => coupon.id,
});

export const coupontSlice = createSlice({
  name: 'coupon',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: couponAdapter.getInitialState(),
  reducers: {
    couponReceived(state, action: PayloadAction<{couponList: string}>) {
      // Or, call them as "mutating" helpers in a case reducer
      couponAdapter.setAll(state, JSON.parse(action.payload.couponList));
    },
    couponAddMany(state, action: PayloadAction<{couponList: string}>) {
      couponAdapter.addMany(state, JSON.parse(action.payload.couponList));
    },
  },
});

export const {couponReceived, couponAddMany} = coupontSlice.actions;

export default coupontSlice.reducer;
