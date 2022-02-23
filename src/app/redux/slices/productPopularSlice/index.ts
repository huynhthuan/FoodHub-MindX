import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

const productPopularAdapter = createEntityAdapter<any[]>({
  // Assume IDs are stored in a field other than `book.id`
  selectId: product => product.id,
});

export const productPopularSlice = createSlice({
  name: 'productPopular',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: productPopularAdapter.getInitialState(),
  reducers: {
    productPopularReceived(
      state,
      action: PayloadAction<{productList: string}>,
    ) {
      // Or, call them as "mutating" helpers in a case reducer
      productPopularAdapter.setAll(
        state,
        JSON.parse(action.payload.productList),
      );
    },
    productPopularAddMany(state, action: PayloadAction<{productList: string}>) {
      productPopularAdapter.addMany(
        state,
        JSON.parse(action.payload.productList),
      );
    },
  },
});

export const {productPopularReceived, productPopularAddMany} =
  productPopularSlice.actions;

export default productPopularSlice.reducer;
