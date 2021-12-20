import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//import { useDispatch, useSelector } from "react-redux";
import "./LoginForm.scss";

export default function LoginForm(props) {
  console.log("props: ", props);
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [user, setUser] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    let { data } = await axios.post("/api/users/signin", { email, password });
    if (data) {
      localStorage.setItem("userInfo", JSON.stringify(data));
      window.location.reload();
      navigate("/", { replace: true });
    }
  };
  return (
    <div className="full-screen-container">
      <div className="topSpacer"></div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1 className="firstFormh1">Sign In</h1>
        </div>
        <div>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button className="" type="submit">
            Sign In
          </button>
        </div>
        <div>
          <label />
          <div>
            New customer? <Link to="/register">Create your account</Link>
          </div>
        </div>
        <div className="bottomSpacer"></div>
      </form>
    </div>
  );
}
