import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

export interface IproductCart {
  product_id: number;
  quantity: number;
  price: number;
  name: string;
  image: string;
}

const productCartAdapter = createEntityAdapter<IproductCart>({
  // Assume IDs are stored in a field other than `book.id`
  selectId: product => product.product_id,
});

export const productCartSlice = createSlice({
  name: 'productsCart',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: productCartAdapter.getInitialState(),
  reducers: {
    productCartRemoveOne(state, action: PayloadAction<{id: number}>) {
      productCartAdapter.removeOne(state, action.payload.id);
    },
    productCartAddOne(state, action: PayloadAction<{product: IproductCart}>) {
      productCartAdapter.setOne(state, action.payload.product);
    },
    productCartUpdateOne(
      state,
      action: PayloadAction<{id: number; changes: IproductCart}>,
    ) {
      productCartAdapter.updateOne(state, action.payload);
    },
  },
});

export const {productCartRemoveOne, productCartAddOne, productCartUpdateOne} =
  productCartSlice.actions;

export default productCartSlice.reducer;
