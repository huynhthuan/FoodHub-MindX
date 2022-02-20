import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

const userReviewAdapter = createEntityAdapter<any[]>({
  // Assume IDs are stored in a field other than `book.id`
  selectId: review => review.id,
});

export const userReviewSlice = createSlice({
  name: 'userReview',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: userReviewAdapter.getInitialState(),
  reducers: {
    userReviewReceived(state, action: PayloadAction<{reviewList: string}>) {
      // Or, call them as "mutating" helpers in a case reducer
      userReviewAdapter.setAll(state, JSON.parse(action.payload.reviewList));
    },
    userReviewAddOne(state, action: PayloadAction<{review: string}>) {
      userReviewAdapter.addOne(state, JSON.parse(action.payload.review));
    },
    userReviewAddMany(state, action: PayloadAction<{reviewList: string}>) {
      userReviewAdapter.addMany(state, JSON.parse(action.payload.reviewList));
    },
  },
});

export const {userReviewReceived, userReviewAddOne, userReviewAddMany} =
  userReviewSlice.actions;

export default userReviewSlice.reducer;
