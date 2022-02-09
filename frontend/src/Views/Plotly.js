import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { useParams } from "react-router-dom";
import { getUsers, selectUsers } from "../Redux/usersSlice";
import useData from "../customHooks/useData";
import { useSelector, useDispatch } from "react-redux";
import { createTimer } from "../Redux/timerSlice";

function Plotly() {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  let dispatch = useDispatch();
  let chartUsers = useSelector(selectUsers);
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
  }, []);

  function handleClick(e) {
    for (let i = 0; i < newData.chart.length; i++) {
      newDates.push(newData.chart[i].date);
      newValues.push(newData.chart[i].value);
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
