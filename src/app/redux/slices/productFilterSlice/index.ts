import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

const productFilterAdapter = createEntityAdapter<any[]>({
  // Assume IDs are stored in a field other than `book.id`
  selectId: product => product.id,
});

export const productFilterSlice = createSlice({
  name: 'productsFilter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: productFilterAdapter.getInitialState(),
  reducers: {
    productFilterReceived(state, action: PayloadAction<{productList: string}>) {
      // Or, call them as "mutating" helpers in a case reducer
      productFilterAdapter.setAll(
        state,
        JSON.parse(action.payload.productList),
      );
    },
    productFilterAddMany(state, action: PayloadAction<{productList: string}>) {
      productFilterAdapter.addMany(
        state,
        JSON.parse(action.payload.productList),
      );
    },
  },
});

export const {productFilterReceived, productFilterAddMany} =
  productFilterSlice.actions;

export default productFilterSlice.reducer;
