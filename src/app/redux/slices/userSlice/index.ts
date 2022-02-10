import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Define a type for the slice state
export interface userState {
  token: string | null;
  user_email: string | null;
  user_nicename: string | null;
  user_display_name: string | null;
  avatar_url: string | null;
  id: number | null;
}

// Define the initial state using that type
const initialState: userState = {
  token: null,
  user_email: null,
  user_nicename: null,
  user_display_name: null,
  avatar_url: null,
  id: null,
};

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    login: (state, action: PayloadAction<userState>) => {
      state.token = action.payload.token;
      state.user_email = action.payload.user_email;
      state.user_nicename = action.payload.user_nicename;
      state.user_display_name = action.payload.user_display_name;
      state.avatar_url = action.payload.avatar_url;
      state.id = action.payload.id;
    },
    logout: state => Object.assign({}, state, initialState),
  },
});

export const {login, logout} = userSlice.actions;

export default userSlice.reducer;
