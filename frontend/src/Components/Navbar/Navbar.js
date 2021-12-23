import React, { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router";
import useAuth from "../../customHooks/useAuth";
import "./Navbar.scss";

function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState([]);
  const [logged, setLogged] = useState({});
  let tokenedUser = useAuth();
  // useEffect(() => {
  //   /let loggedIn = JSON.parse(localStorage.getItem("userInfo"));
  // //   if (tokenedUser) {
  // //     console.log("tokenedUser: ", tokenedUser);
  // //     setUser(tokenedUser.name);
  // //     //window.location.reload();
  // //   }
  // // }, [user, setUser]);

  // useEffect(() => {
  // }, []);

  const handleClick = () => {
    setOpen(!open);
  };

  const closeMenu = () => {
    setOpen(false);
  };
  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo move-left">
        mariposaweb
      </Link>
      <div onClick={handleClick} className="nav-icon">
        {open ? <FiX /> : <FiMenu />}
      </div>
      <ul className={open ? "nav-links active" : "nav-links"}>
        <li className="nav-item">
          <Link to="/" className="nav-link" onClick={closeMenu}>
            Home
          </Link>
        </li>
        {!tokenedUser ? (
          <li className="nav-item">
            <Link to="/login" className="nav-link" onClick={closeMenu}>
              Login
            </Link>
          </li>
        ) : (
          <>
            <li className="nav-logout">
              <a>{tokenedUser.name} </a>
            </li>
            <li className="nav-logout" onClick={logout}>
              <a>Logout</a>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
