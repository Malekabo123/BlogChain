import { createSlice } from "@reduxjs/toolkit";
const initiaUpdateState = {
  postData: {},
};

const updatePostSlice = createSlice({
  name: "updatePost",
  initialState: initiaUpdateState,
  reducers: {
    addPostData(state, action) {
      state.postData = action.payload;
    },
  },
});

export const updatePostActions = updatePostSlice.actions;

export default updatePostSlice.reducer;
