import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice";
import loginReducer from "../Components/Login/loginSlice";

const store = configureStore({
  reducer: {
    users: usersReducer,
    login: loginReducer,
  },
});

export default store;
