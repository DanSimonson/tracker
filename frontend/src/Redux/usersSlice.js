import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (dispatch, getState) => {
    const { data } = await axios.get("/api/users");
    if (data) {
      return data.users;
    }
  }
);
export const getUser = createAsyncThunk(
  "users/getUser",
  async (email, password) => {
    let { data } = await axios.post("/api/users/signin", { email, password });
    if (data) {
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data.users;
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    status: null,
  },
  extraReducers: {
    [getUsers.pending]: (state, action) => {
      state.status = "loading";
    },
    [getUsers.fulfilled]: (state, action) => {
      state.status = "success";
      state.users = action.payload;
    },
    [getUsers.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export const selectUsers = ({ users }) => users;

export default usersSlice.reducer;
