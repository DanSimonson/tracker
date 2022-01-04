import React from "react";
import { Outlet, Navigate, Link } from "react-router-dom";
import LoginPage from "./Views/LoginPage";
import useAuth from "./customHooks/useAuth";

const ProtectedRoutes = () => {
  let isAuth = useAuth();
  return isAuth ? <Outlet /> : <LoginPage />;
};

export default ProtectedRoutes;
