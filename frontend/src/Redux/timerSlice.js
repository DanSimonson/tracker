import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createTimer = createAsyncThunk(
  "/post",
  async (time, user_id, name) => {
    let res = await axios.post("/api/timer/", {
      time,
      user_id,
      name,
    });
    return res.timers;
  }
);

export const timerSlice = createSlice({
  name: "timer",
  initialState: {
    timers: [],
    status: null,
  },
  extraReducers: {
    [createTimer.pending]: (state, action) => {
      state.status = "loading";
    },
    [createTimer.fulfilled]: (state, action) => {
      state.status = "success";
      state.push(action.payload);
    },
    [createTimer.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export const { timers, status } = timerSlice.actions;

export default timerSlice.reducer;
