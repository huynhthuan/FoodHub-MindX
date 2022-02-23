import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

const productFeatureAdapter = createEntityAdapter<any[]>({
  // Assume IDs are stored in a field other than `book.id`
  selectId: product => product.id,
});

export const productFeatureSlice = createSlice({
  name: 'productFeature',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: productFeatureAdapter.getInitialState(),
  reducers: {
    productFeatureReceived(
      state,
      action: PayloadAction<{productList: string}>,
    ) {
      // Or, call them as "mutating" helpers in a case reducer
      productFeatureAdapter.setAll(
        state,
        JSON.parse(action.payload.productList),
      );
    },
    productFeatureAddMany(state, action: PayloadAction<{productList: string}>) {
      productFeatureAdapter.addMany(
        state,
        JSON.parse(action.payload.productList),
      );
    },
  },
});

export const {productFeatureReceived, productFeatureAddMany} =
  productFeatureSlice.actions;

export default productFeatureSlice.reducer;
