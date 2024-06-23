import { createSlice } from "@reduxjs/toolkit";
const initiaLoginState = {
  isLoggedIn: false,
  userInfo: {},
};

const loginSlice = createSlice({
  name: "isLoggedIn",
  initialState: initiaLoginState,
  reducers: {
    changeIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    addUserInfo(state, action) {
      state.userInfo = action.payload;
    },
  },
});

export const isLoggedInActions = loginSlice.actions;

export default loginSlice.reducer;
