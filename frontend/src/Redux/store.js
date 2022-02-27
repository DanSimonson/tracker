import { configureStore } from "@reduxjs/toolkit";
import timersReducer from "./timersSlice";
export default configureStore({
  reducer: {
    timers: timersReducer,
  },
});
