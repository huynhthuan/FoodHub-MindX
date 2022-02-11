import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface loadingState {
  isShown: boolean;
}

const initialState: loadingState = {
  isShown: false,
};

export const loadingSlice = createSlice({
  name: 'loading',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<loadingState>) => {
      state.isShown = action.payload.isShown;
    },
  },
});

export const {setLoading} = loadingSlice.actions;

export default loadingSlice.reducer;
