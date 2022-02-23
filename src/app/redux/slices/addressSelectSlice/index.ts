import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import {deliveryAddressData} from '../deliveryAddressSlice';

const selectDeliveryAddressAdapter = createEntityAdapter<deliveryAddressData>({
  // Assume IDs are stored in a field other than `book.id`
  selectId: address => address.id,
});

export const selectDeliveryAddressSlice = createSlice({
  name: 'selectDeliveryAddress',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: selectDeliveryAddressAdapter.getInitialState(),
  reducers: {
    selectDeliveryAddressReceived(
      state,
      action: PayloadAction<{deliveryAddressList: deliveryAddressData[]}>,
    ) {
      // Or, call them as "mutating" helpers in a case reducer
      selectDeliveryAddressAdapter.setAll(
        state,
        action.payload.deliveryAddressList,
      );
    },
    selectDeliveryAddressAddOne(
      state,
      action: PayloadAction<{address: deliveryAddressData}>,
    ) {
      // Or, call them as "mutating" helpers in a case reducer
      selectDeliveryAddressAdapter.addOne(state, action.payload.address);
    },
  },
});

export const {selectDeliveryAddressReceived, selectDeliveryAddressAddOne} =
  selectDeliveryAddressSlice.actions;

export default selectDeliveryAddressSlice.reducer;
