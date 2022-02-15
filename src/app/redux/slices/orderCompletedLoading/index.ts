import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface loadingState {
  isLoading: boolean;
}

const initialState: loadingState = {
  isLoading: false,
};

export const orderCompletedLoading = createSlice({
  name: 'orderCompletedLoading',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setOrderCompletedLoading: (state, action: PayloadAction<loadingState>) => {
      state.isLoading = action.payload.isLoading;
    },
  },
});

export const {setOrderCompletedLoading} = orderCompletedLoading.actions;

export default orderCompletedLoading.reducer;
