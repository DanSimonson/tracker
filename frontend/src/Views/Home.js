import React, { useEffect, useState, useRef } from "react";
import Products from "../Components/Products";
import LoginForm from "../Components/Login/LoginForm";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../Redux/usersSlice";
import useAuth from "../customHooks/useAuth";
import Timer from "../Components/Timer/Timer";
import Clock from "../Components/Clock/Clock";
import "./Home.scss";

function Home() {
  let tokenedUser = useAuth();
  const dispatch = useDispatch();
  const newState = useSelector((state) => state);
  const { users, status, isAdmin } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return <Clock />;
}

export default Home;
