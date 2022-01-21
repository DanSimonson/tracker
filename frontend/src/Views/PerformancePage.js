import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUsers } from "../Redux/usersSlice";
import { useSelector, useDispatch } from "react-redux";
import useAuth from "../customHooks/useAuth";
import axios from "axios";

const PerformancePage = () => {
  const [foundUser, setFoundUser] = useState([]);
  let tokenedUser = useAuth();
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let { id } = useParams();
  const { users, status, isAdmin } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsers());
    findUser();
    findTimes();
  }, []);

  const findTimes = async () => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    try {
      let { data } = await axios.get("/api/timer/");
      const result = data.timers.filter((time) => time.user_id === user._id);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const findUser = () => {
    let user = users.filter((user) => user._id === id);
    setFoundUser(user[0]);
  };

  return (
    <div>
      <h2>{foundUser ? `performance page for ${foundUser.name}` : null}</h2>
    </div>
  );
};

export default PerformancePage;
