import { configureStore } from "@reduxjs/toolkit";
import publishedReducer from "./publishSlice";
import loggingReducer from "./loggingSlice";
import updatePostReducer from "./updatePostSlice";

const store = configureStore({
  reducer: {
    publishMessage: publishedReducer,
    userLogging: loggingReducer,
    updatePost: updatePostReducer,
  },
});

export default store;
