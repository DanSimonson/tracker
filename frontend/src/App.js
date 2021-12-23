import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useAuth from "./customHooks/useAuth";
import Products from "./Components/Products";
import Home from "./Views/Home";
import LoginPage from "./Views/LoginPage";
import RegisterPage from "./Views/RegisterPage";
import Navbar from "./Components/Navbar/Navbar";
import ProtectedRoutes from "./ProtectedRoutes";

function App() {
  useEffect(() => {}, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>

    // <div className="App">
    //   <Products products={products} />
    //   <h1 onClick={getData}>tracker</h1>
    //    {products.map((product) => {
    //     <ul key={product._id}>
    //       <li>{product.name}</li>
    //     </ul>;
    //   })}
    // </div>
  );
}

export default App;
