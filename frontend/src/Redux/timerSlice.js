import { createSlice } from "@reduxjs/toolkit";

export const timerSlice = createSlice({
  name: "timer",
  initialState: {
    timer: 3,
    user: "",
    user_id: "",
  },
  reducers: {
    add: (state, action) => {
      const timer = {
        timer: action.payload.timer,
        user: action.payload.name,
        user_id: action.payload._id,
      };
    },
  },
});

export const { add } = timerSlice.actions;

export default timerSlice.reducer;
