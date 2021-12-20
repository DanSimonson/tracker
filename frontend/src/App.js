//import logo from "./logo.svg";
import React, { useEffect, useState } from "react";

import "./App.css";
//import axios from "axios";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./Components/Products";
import Home from "./Views/Home";
import LoginPage from "./Views/LoginPage";
import RegisterPage from "./Views/Register";
import Navbar from "./Components/Navbar/Navbar";
import ProtectedRoutes from "./ProtectedRoutes";

//import Home from "./Components/Home";
//import data from "../../backend/data";

function App() {
  // const [products, setProducts] = useState([]);
  // useEffect(() => {
  //   const getData = async () => {
  //     const data = await axios.get("/api/products");
  //     setProducts(data);
  //   };
  //   getData();
  // }, []);

  // const getData = () => {
  //   const getData = async () => {
  //     const data = await axios.get("localhost:5000/api/products");
  //     setProducts(data);
  //   };
  // };
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
