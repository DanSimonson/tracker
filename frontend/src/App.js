import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useAuth from "./customHooks/useAuth";
import Products from "./Components/Products";
import Home from "./Views/Home";
import LoginPage from "./Views/LoginPage";
import RegisterPage from "./Views/RegisterPage";
import PerformancePage from "./Views/PerformancePage";
import Navbar from "./Components/Navbar/Navbar";
import ProtectedRoutes from "./ProtectedRoutes";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "./Redux/usersSlice";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/performance/:id" element={<PerformancePage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
