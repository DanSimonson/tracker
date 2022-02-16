import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { useParams } from "react-router-dom";
import { getUsers, selectUsers } from "../Redux/usersSlice";
import { useSelector, useDispatch } from "react-redux";
import { createTimer } from "../Redux/timerSlice";
import expressAsyncHandler from "express-async-handler";
import FormData from "../Utils/FormData";
import axios from "axios";
import "./Plotly.scss";

function Plotly() {
  const [chart, setChart] = useState([]);
  const user = JSON.parse(localStorage.getItem("userInfo"));
  let dispatch = useDispatch();
  let { id } = useParams();
  let newDates = [];
  let newValues = [];
  let wdth = parseInt(1000);

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
    if (result.length === 0) {
      //no data to display
    } else {
      for (let i = 0; i < result.length; i++) {
        newDates.push(result[i].updatedAt.substr(0, 10));
        newValues.push(result[i].time);
      }

      sample.forEach((element) => {
        if (element.category === e.target.id) {
          setData({ dates: newDates, values: newValues });
        }
      });
    }
  }

  return (
    <div>
      <div className="headerButtonLayout">
        <a id="A" onClick={handleClick}>
          {user ? `Check performance for ${user.name}` : null}
        </a>
      </div>
      <div className="chartLayout">
        <Plot
          data={[
            {
              type: "bar",
              x: data.dates,
              y: data.values,
            },
          ]}
          layout={{
            width: 425,
            height: 500,
            title: "interactive bar chart",
          }}
        />
        <Plot
          data={[
            {
              type: "scatter",
              x: data.dates,
              y: data.values,
            },
          ]}
          layout={{
            width: 425,
            height: 500,
            title: "interactive line chart",
          }}
        />
      </div>
    </div>
  );
}
export default Plotly;
