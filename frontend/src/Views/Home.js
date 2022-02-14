import React, { useEffect, useState } from "react";
import Clock from "../Components/Clock/Clock";
import "./Home.scss";

function Home() {
  //const [loggedIn, setLoggedIn] = useState(false);
  //const user = JSON.parse(localStorage.getItem("userInfo"));
  // useEffect(() => {
  //   setLoggedIn(!user);
  //   //window.location.reload();
  // }, []);
  return <Clock />;
}

export default Home;
