import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface loadingState {
  isLoading: boolean;
}

const initialState: loadingState = {
  isLoading: true,
};

export const deliveryAddressLoadingSlice = createSlice({
  name: 'delivertAddressloading',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<loadingState>) => {
      state.isLoading = action.payload.isLoading;
    },
  },
});

export const {setLoading} = deliveryAddressLoadingSlice.actions;

export default deliveryAddressLoadingSlice.reducer;
