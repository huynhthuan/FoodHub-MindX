import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface signUpState {
  userName: string | null;
  email: string | null;
  password: string | null;
  phone: string | null;
}

const initialState: signUpState = {
  userName: null,
  email: null,
  password: null,
  phone: null,
};

export const userSignUpSlice = createSlice({
  name: 'signUp',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    signUpData: (state, action: PayloadAction<signUpState>) => {
      state.email = action.payload.email;
      state.userName = action.payload.userName;
      state.password = action.payload.password;
      state.phone = action.payload.phone;
    },
  },
});

export const {signUpData} = userSignUpSlice.actions;

export default userSignUpSlice.reducer;
