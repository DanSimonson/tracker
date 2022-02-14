import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { useParams } from "react-router-dom";
import { getUsers, selectUsers } from "../Redux/usersSlice";
import useData from "../customHooks/useData";
import { useSelector, useDispatch } from "react-redux";
import { createTimer } from "../Redux/timerSlice";
import expressAsyncHandler from "express-async-handler";
import FormData from "../Utils/FormData";
import axios from "axios";

function Plotly() {
  const [chart, setChart] = useState([]);
  const user = JSON.parse(localStorage.getItem("userInfo"));
  let dispatch = useDispatch();
  let { id } = useParams();
  let newData = useData();
  let newDates = [];
  let newValues = [];

  const sample = [
    {
      category: "A",
      values: newValues,
      dates: newDates,
    },
  ];
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(getUsers());
    function getTimers() {
      axios
        .get("/api/timer/")
        .then((res) => {
          console.log("res: ", res);
          setChart(res.data.timers);
        })
        .catch((error) => {
          console.log("error: ", error.message);
        });
    }
    getTimers();
  }, []);

  function handleClick(e) {
    console.log("chart: ", chart);
    let result = chart.filter((time) => time.user_id === user._id);
    for (let i = 0; i < chart.length; i++) {
      newDates.push(chart[i].updatedAt.substr(0, 10));
      newValues.push(chart[i].time);
    }

    sample.forEach((element) => {
      if (element.category === e.target.id) {
        setData({ dates: newDates, values: newValues });
      }
    });
  }

  return (
    <div>
      <div>
        <button onClick={handleClick} id="A">
          {user ? `performance page for ${user.name}` : null}
        </button>
      </div>
      <Plot
        data={[
          {
            type: "bar",
            x: data.dates,
            y: data.values,
          },
        ]}
        layout={{ width: 800, height: 500, title: "interactive bar chart" }}
      />
    </div>
  );
}
export default Plotly;
