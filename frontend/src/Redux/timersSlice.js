import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getTimers = createAsyncThunk("timers/getTimers", async () => {
  let { data } = await axios.get("/api/timer/");
  return data.timers;
});
// const initialState = [
//   { id: "1", name: "Dave Patrick", email: "dave@gmail.com" },
//   { id: "2", name: "Hank Gluhwein", email: "hank@gmail.com" },
// ];

const timersSlice = createSlice({
  name: "timers",
  initialState: {
    timers: [],
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [getTimers.pending]: (state, action) => {
      state.loading = true;
    },
    [getTimers.fulfilled]: (state, action) => {
      state.loading = false;
      state.timers = [...state.timers, ...action.payload];
      //state.timers =
    },
    [getTimers.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

//export const { userAdded } = usersSlice.actions;

export default timersSlice.reducer;
