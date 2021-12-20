import React, { useEffect, useState } from "react";
import Products from "../Components/Products";
import LoginForm from "../Components/Login/LoginForm";
import axios from "axios";

function Home() {
  const [prod, setProd] = useState([]);
  const [loading, setLoading] = useState([false]);
  const [error, setError] = useState(false);
  useEffect(() => {
    try {
      const getData = async () => {
        setLoading(true);
        const data = await axios.get("/api/products");
        setLoading(false);
        setProd(data);
      };
      getData();
    } catch (error) {
      console.log("error", error.message);
      setLoading(false);
    }
  }, []);

  return (
    <>
      <div>
        {loading ? (
          <h1>LOADING...</h1>
        ) : error ? (
          <h1>Error...</h1>
        ) : (
          <h1>test</h1>
        )}
      </div>
    </>
  );
}

export default Home;
