import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface address {
  id: string;
}
const initialState = {
  id: '0',
};

export const addressChoseenSlice = createSlice({
  name: 'addressChoseen',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setAddressChoseen: (state, action: PayloadAction<address>) => {
      state.id = action.payload.id;
    },
  },
});

export const {setAddressChoseen} = addressChoseenSlice.actions;

export default addressChoseenSlice.reducer;
