import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice";
import timerReducer from "./timerSlice";
import loginReducer from "../Components/Login/loginSlice";

const store = configureStore({
  reducer: {
    users: usersReducer,
    login: loginReducer,
    timer: timerReducer,
  },
});

export default store;
