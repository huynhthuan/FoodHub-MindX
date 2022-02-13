import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

const ordersAdapter = createEntityAdapter<any[]>({
  // Assume IDs are stored in a field other than `book.id`
  selectId: order => order.id,
});

export const orderSlice = createSlice({
  name: 'orders',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: ordersAdapter.getInitialState(),
  reducers: {
    ordersReceived(state, action: PayloadAction<{orderList: string}>) {
      // Or, call them as "mutating" helpers in a case reducer
      ordersAdapter.setAll(state, JSON.parse(action.payload.orderList));
    },
  },
});

export const {ordersReceived} = orderSlice.actions;

export default orderSlice.reducer;
