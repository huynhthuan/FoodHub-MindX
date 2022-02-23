import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

const productSaleAdapter = createEntityAdapter<any[]>({
  // Assume IDs are stored in a field other than `book.id`
  selectId: product => product.id,
});

export const productSaleSlice = createSlice({
  name: 'productSale',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: productSaleAdapter.getInitialState(),
  reducers: {
    productSaleReceived(state, action: PayloadAction<{productList: string}>) {
      // Or, call them as "mutating" helpers in a case reducer
      productSaleAdapter.setAll(state, JSON.parse(action.payload.productList));
    },
    productSaleAddMany(state, action: PayloadAction<{productList: string}>) {
      productSaleAdapter.addMany(state, JSON.parse(action.payload.productList));
    },
  },
});

export const {productSaleReceived, productSaleAddMany} =
  productSaleSlice.actions;

export default productSaleSlice.reducer;
