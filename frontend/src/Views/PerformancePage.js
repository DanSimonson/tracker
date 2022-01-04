import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUsers } from "../Redux/usersSlice";
import { useSelector, useDispatch } from "react-redux";

const PerformancePage = () => {
  const [foundUser, setFoundUser] = useState([]);
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let { id } = useParams();
  const { users, status, isAdmin } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsers());
    findUser();
  }, []);

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
