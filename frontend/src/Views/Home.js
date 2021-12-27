import React, { useEffect, useState, useRef } from "react";
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
  const [randomInput, setRandomInput] = useState("");
  const [seconds, setSeconds] = useState(20);
  const renders = useRef(0);
  const inputRef = useRef();
  const timerId = useRef();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const handleChange = (e) => {
    setRandomInput(e.target.value);
    renders.current++;
  };

  const startTimer = () => {
    timerId.current = setInterval(() => {
      renders.current++;
      setSeconds((prev) => prev - 1);
    }, 1000);
    //inputRef.current.focus();
  };

  const stopTimer = () => {
    clearInterval(timerId.current);
    timerId.current = 0;
    //inputRef.current.focus();
  };

  const resetTimer = () => {
    stopTimer();
    if (seconds) {
      renders.current++;
      setSeconds(0);
    }
    //inputRef.current.focus();
  };

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
          // <h1>
          //   {users.map((user) => (
          //     <ul key={user.id} style={{ listStyle: "none" }}>
          //       <li>user: {user.name}</li>
          //       <li>email: {user.email}</li>
          //     </ul>
          //   ))}
          // </h1>
          <>
            <section>
              <button onClick={startTimer}>Start</button>
              <button onClick={stopTimer}>Stop</button>
              <button onClick={resetTimer}>Reset</button>
            </section>
            <br />
            <br />
            <p>Seconds: {seconds}</p>
          </>
        ) : null}
      </div>
    </>
  );
}

export default Home;
