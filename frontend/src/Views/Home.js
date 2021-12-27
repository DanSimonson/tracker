import React, { useEffect, useState } from "react";
import Products from "../Components/Products";
import LoginForm from "../Components/Login/LoginForm";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../Redux/usersSlice";

function Home() {
  const dispatch = useDispatch();
  const newState = useSelector((state) => state);
  console.log("newState: ", newState);
  const { users, status, isAdmin } = useSelector((state) => state.users);
  const [prod, setProd] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <>
      <div
        style={{
          fontSize: "2rem",
          fontWeight: "600",
          marginLeft: "2.2rem",
          marginTop: "2rem",
        }}
      >
        Users
      </div>
      <div>
        {status === "loading" ? (
          <h1>LOADING...</h1>
        ) : error ? (
          <h1>Error...</h1>
        ) : status === "success" ? (
          <h1>
            {users.map((user) => (
              <ul key={user.id} style={{ listStyle: "none" }}>
                <li>user: {user.name}</li>
                <li>email: {user.email}</li>
              </ul>
            ))}
          </h1>
        ) : null}
      </div>
    </>
  );
}

export default Home;
