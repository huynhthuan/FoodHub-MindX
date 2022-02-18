import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

const NoticesAdapter = createEntityAdapter<any[]>({
  // Assume IDs are stored in a field other than `book.id`
  selectId: notice => notice.id,
});

export const noticesSlice = createSlice({
  name: 'notice',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: NoticesAdapter.getInitialState(),
  reducers: {
    noticesReceived(state, action: PayloadAction<{noticeList: string}>) {
      // Or, call them as "mutating" helpers in a case reducer
      NoticesAdapter.setAll(state, JSON.parse(action.payload.noticeList));
    },
    noticesAddMany(state, action: PayloadAction<{noticeList: string}>) {
      NoticesAdapter.addMany(state, JSON.parse(action.payload.noticeList));
    },
  },
});

export const {noticesReceived, noticesAddMany} = noticesSlice.actions;

export default noticesSlice.reducer;
