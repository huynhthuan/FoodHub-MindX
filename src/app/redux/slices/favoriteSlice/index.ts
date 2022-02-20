import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

const favoritesAdapter = createEntityAdapter<any[]>({
  // Assume IDs are stored in a field other than `book.id`
  selectId: product => product.id,
});

export const favoritesSlice = createSlice({
  name: 'favorites',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: favoritesAdapter.getInitialState(),
  reducers: {
    favoritesReceived(state, action: PayloadAction<{productList: string}>) {
      // Or, call them as "mutating" helpers in a case reducer
      favoritesAdapter.setAll(state, JSON.parse(action.payload.productList));
    },
    favoritesAddOne(state, action: PayloadAction<{product: string}>) {
      favoritesAdapter.addOne(state, JSON.parse(action.payload.product));
    },
    favoritesRemoveOne(state, action: PayloadAction<{productId: number}>) {
      favoritesAdapter.removeOne(state, action.payload.productId);
    },
  },
});

export const {favoritesReceived, favoritesAddOne, favoritesRemoveOne} =
  favoritesSlice.actions;

export default favoritesSlice.reducer;
