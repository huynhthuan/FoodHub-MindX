import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Define a type for the slice state
export interface couponState {
  code: string;
  desc: string;
  amount: number;
}

// Define the initial state using that type
const initialState: couponState = {
  code: '',
  desc: '',
  amount: 0,
};

export const couponCartSlice = createSlice({
  name: 'couponCart',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateCouponCart: (state, action: PayloadAction<couponState>) => {
      state.code = action.payload.code;
      state.desc = action.payload.desc;
      state.amount = action.payload.amount;
    },
  },
});

export const {updateCouponCart} = couponCartSlice.actions;

export default couponCartSlice.reducer;
