import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

const productSearchAdapter = createEntityAdapter<any[]>({
  // Assume IDs are stored in a field other than `book.id`
  selectId: product => product.id,
});

export const productSearchSlice = createSlice({
  name: 'productsSearch',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: productSearchAdapter.getInitialState(),
  reducers: {
    productSearchReceived(state, action: PayloadAction<{productList: string}>) {
      // Or, call them as "mutating" helpers in a case reducer
      productSearchAdapter.setAll(
        state,
        JSON.parse(action.payload.productList),
      );
    },
    productSearchAddMany(state, action: PayloadAction<{productList: string}>) {
      productSearchAdapter.addMany(
        state,
        JSON.parse(action.payload.productList),
      );
    },
  },
});

export const {productSearchReceived, productSearchAddMany} =
  productSearchSlice.actions;

export default productSearchSlice.reducer;
