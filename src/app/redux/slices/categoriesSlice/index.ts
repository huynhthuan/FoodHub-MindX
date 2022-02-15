import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

const categoriesAdapter = createEntityAdapter<any[]>({
  // Assume IDs are stored in a field other than `book.id`
  selectId: categories => categories.id,
});

export const categoriesSlice = createSlice({
  name: 'categories',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: categoriesAdapter.getInitialState(),
  reducers: {
    categoriesReceived(state, action: PayloadAction<{categoriesList: string}>) {
      // Or, call them as "mutating" helpers in a case reducer
      categoriesAdapter.setAll(state, JSON.parse(action.payload.categoriesList));
    },
    categoriesAddMany(state, action: PayloadAction<{categoriesList: string}>) {
      categoriesAdapter.addMany(state, JSON.parse(action.payload.categoriesList));
    },
  },
});

export const {categoriesReceived, categoriesAddMany} = categoriesSlice.actions;

export default categoriesSlice.reducer;
