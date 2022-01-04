import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import axios from "axios";
import "./RegisterForm.scss";
import useAuth from "../../customHooks/useAuth";

export default function LoginForm(props) {
  let navigate = useNavigate();
  let tokenedUser = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = useState("");
  const [redirectToHome, setRedirectToHome] = useState(false);

  useEffect(() => {
    //let temp = getItem('userInfo')
    //let temp = localStorage.getItem("key") || "{}";
    //setUser(JSON.parse(temp));
  }, [redirectToHome]);

  const submitHandler = async (e) => {
    e.preventDefault();
    // if (user) {
    //   console.log("user: ", user);
    // } else {
    //   console.log("no user found");
    // }
    if (password !== confirmPassword) {
      alert("Password and confirm password are not match");
    } else {
      let { data } = await axios.post("/api/users/register", {
        name,
        email,
        password,
      });
      if (data) {
        localStorage.setItem("userInfo", JSON.stringify(data));
      }
    }
  };
  return (
    <>
      <div className="full-screen-container">
        <form className="form" onSubmit={submitHandler}>
          <div>
            <h1 className="firstFormh1">Create New Account</h1>
          </div>
          <div>
            <label htmlFor="name">User Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter username"
              required
              onChange={(e) => setName(e.target.value)}
            ></input>
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
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Enter password"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></input>
          </div>
          <div>
            <label />
            <button className="" type="submit">
              Register
            </button>
            {redirectToHome ? <Navigate to="/" /> : null}
          </div>
          <div>
            <label />
            <div>
              Already A Customer? <Link to="/login">Sign-In</Link>
            </div>
          </div>
          <div className="bottomSpacer"></div>
        </form>
      </div>
      {/* <div style={{ height: "900px" }}></div> */}
    </>
  );
}
