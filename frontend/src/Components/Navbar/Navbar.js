import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router";
import "./Navbar.scss";

function Navbar() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const closeMenu = () => {
    setOpen(false);
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
        <li className="nav-item">
          <Link to="/login" className="nav-link" onClick={closeMenu}>
            Login
          </Link>
        </li>
        {/* <li className="nav-item">
          <Link to="/Register" className="nav-link" onClick={closeMenu}>
            Register
          </Link>
        </li> */}
        {/* <li className="nav-item">
          <Link
            to="/contact"
            className="nav-link move-right"
            onClick={closeMenu}
          >
            Contact
          </Link>
        </li> */}
      </ul>
    </nav>
  );
}

export default Navbar;
