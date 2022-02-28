import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getTimers, timerAdded } from "../Redux/timersSlice";

export const useData = () => {
  let dispatch = useDispatch;
  useEffect(() => {}, []);
};

//export default useData;
