import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

export interface selectProvincesItem {
  label: string;
  value: string;
}

export interface deliveryAddressData {
  id: string;
  name: string | undefined;
  address: string | undefined;
  city: string;
  state: string;
  wards: string;
  phone: string | undefined;
  shipping_address_note: string | undefined;
}

const deliveryAddressAdapter = createEntityAdapter<deliveryAddressData>({
  // Assume IDs are stored in a field other than `book.id`
  selectId: address => address.id,
});

export const deliveryAddressSlice = createSlice({
  name: 'deliveryAddress',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: deliveryAddressAdapter.getInitialState(),
  reducers: {
    deliveryAddressReceived(
      state,
      action: PayloadAction<{deliveryAddressList: deliveryAddressData[]}>,
    ) {
      // Or, call them as "mutating" helpers in a case reducer
      deliveryAddressAdapter.setAll(state, action.payload.deliveryAddressList);
    },
  },
});

export const {deliveryAddressReceived} = deliveryAddressSlice.actions;

export default deliveryAddressSlice.reducer;
