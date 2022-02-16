import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

const productAdapter = createEntityAdapter<any[]>({
  // Assume IDs are stored in a field other than `book.id`
  selectId: product => product.id,
});

export const productSlice = createSlice({
  name: 'products',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: productAdapter.getInitialState(),
  reducers: {
    productReceived(state, action: PayloadAction<{productList: string}>) {
      // Or, call them as "mutating" helpers in a case reducer
      productAdapter.setAll(state, JSON.parse(action.payload.productList));
    },
    productAddMany(state, action: PayloadAction<{productList: string}>) {
      productAdapter.addMany(state, JSON.parse(action.payload.productList));
    },
  },
});

export const {productReceived, productAddMany} = productSlice.actions;

export default productSlice.reducer;
