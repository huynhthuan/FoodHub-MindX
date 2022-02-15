import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface loadingState {
  isLoading: boolean;
}

const initialState: loadingState = {
  isLoading: false,
};

export const orderUpcommingLoading = createSlice({
  name: 'orderUpcommingLoading',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setOrderUpcommingLoading: (state, action: PayloadAction<loadingState>) => {
      state.isLoading = action.payload.isLoading;
    },
  },
});

export const {setOrderUpcommingLoading} = orderUpcommingLoading.actions;

export default orderUpcommingLoading.reducer;
