import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

const ordersCompletedAdapter = createEntityAdapter<any[]>({
  // Assume IDs are stored in a field other than `book.id`
  selectId: (order: any) => order.id,
});

export const orderCompletedSlice = createSlice({
  name: 'ordersCompleted',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: ordersCompletedAdapter.getInitialState(),
  reducers: {
    ordersCompletedReceived(state, action: PayloadAction<{orderList: string}>) {
      // Or, call them as "mutating" helpers in a case reducer
      ordersCompletedAdapter.setAll(
        state,
        JSON.parse(action.payload.orderList),
      );
    },
    ordersCompletedAddMany(state, action: PayloadAction<{orderList: string}>) {
      ordersCompletedAdapter.addMany(
        state,
        JSON.parse(action.payload.orderList),
      );
    },
  },
});

export const {ordersCompletedReceived, ordersCompletedAddMany} =
  orderCompletedSlice.actions;

export default orderCompletedSlice.reducer;
