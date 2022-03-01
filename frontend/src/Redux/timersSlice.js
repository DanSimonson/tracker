import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getTimers = createAsyncThunk("timers/getTimers", async () => {
  let { data } = await axios.get("/api/timer/");
  return data.timers;
});

export const setTimers = createAsyncThunk(
  "timers/setTimers",
  async (newData) => {
    let { data } = await axios.post("/api/timer/", {
      time: newData.time,
      user_id: newData.user_id,
      name: newData.name,
    });
    return data.timer;
  }
);

const timersSlice = createSlice({
  name: "timers",
  initialState: {
    timers: [],
    newTimers: [],
    loading: false,
  },
  reducers: {
    timerAdded(state, action) {
      state.newTimers.push(action.payload);
    },
  },
  extraReducers: {
    [getTimers.pending]: (state, action) => {
      state.loading = true;
    },
    [getTimers.fulfilled]: (state, action) => {
      state.loading = false;
      state.timers = [...state.timers, ...action.payload];
    },
    [getTimers.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export const { timerAdded } = timersSlice.actions;

export default timersSlice.reducer;
