import { createSlice } from "@reduxjs/toolkit";
const initiaPublishState = { published: false };

const publishSlice = createSlice({
  name: "isPublished",
  initialState: initiaPublishState,
  reducers: {
    changeIsPublished(state, action) {
      state.published = action.payload;
    },
  },
});

export const isPublishedActions = publishSlice.actions;

export default publishSlice.reducer;
