import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Define a type for the slice state
export interface userState {
  token: string | undefined;
  user_email: string | undefined;
  user_nicename: string | undefined;
  user_display_name: string | undefined;
  avatar_url: string | undefined;
  id: number | undefined;
  phone: string | undefined;
  first_name: string | undefined;
  last_name: string | undefined;
  product_like: string | undefined;
}

// Define the initial state using that type
const initialState: userState = {
  token: undefined,
  user_email: undefined,
  user_nicename: undefined,
  user_display_name: undefined,
  avatar_url: undefined,
  id: undefined,
  phone: undefined,
  first_name: undefined,
  last_name: undefined,
  product_like: undefined,
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
      state.phone = action.payload.phone;
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.product_like = action.payload.product_like;
    },
    updateUserAvatar: (state, action: PayloadAction<string>) => {
      state.avatar_url = action.payload;
    },
    updateUserPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },
    updateFirstName: (state, action: PayloadAction<string>) => {
      state.first_name = action.payload;
    },
    updateLastName: (state, action: PayloadAction<string>) => {
      state.last_name = action.payload;
    },
    updateProductLike: (state, action: PayloadAction<string>) => {
      state.product_like = action.payload;
    },
    logout: state => Object.assign({}, state, initialState),
  },
});

export const {
  login,
  logout,
  updateUserAvatar,
  updateUserPhone,
  updateFirstName,
  updateLastName,
  updateProductLike
} = userSlice.actions;

export default userSlice.reducer;
