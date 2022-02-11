import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Incubator} from 'react-native-ui-lib';

export interface toastState {
  isShown: boolean;
  msg: string;
  preset: Incubator.ToastPresets;
}

const initialState: toastState = {
  isShown: false,
  msg: '',
  preset: Incubator.ToastPresets.FAILURE,
};

export const toastSlice = createSlice({
  name: 'toast',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    showToast: (state, action: PayloadAction<toastState>) => {
      state.isShown = action.payload.isShown;
      state.msg = action.payload.msg;
      state.preset = action.payload.preset;
    },
  },
});

export const {showToast} = toastSlice.actions;

export default toastSlice.reducer;
