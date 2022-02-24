import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Views/Home";
import LoginPage from "./Views/LoginPage";
import RegisterPage from "./Views/RegisterPage";
import Plotly from "./Views/Plotly";
import Navbar from "./Components/Navbar/Navbar";
import ProtectedRoutes from "./ProtectedRoutes";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/plotly/:id" element={<Plotly />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
