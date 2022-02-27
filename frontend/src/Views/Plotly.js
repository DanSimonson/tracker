import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Plotly.scss";

function Plotly() {
  const [chart, setChart] = useState([]);
  const user = JSON.parse(localStorage.getItem("userInfo"));
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
        <a type="button" id="A" onClick={handleClick}>
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
            responsive: true,
            useResizeHandler: true,
            autosize: true,
            width: "100%",
            height: "100%",
            title: "Performance Bar Chart",
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
            responsive: true,
            useResizeHandler: true,
            autosize: true,
            width: "100%",
            height: "100%",
            title: "Performance Line Chart",
          }}
        />
      </div>
    </div>
  );
}
export default Plotly;
