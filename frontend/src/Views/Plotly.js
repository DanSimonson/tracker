import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { useParams } from "react-router-dom";
import { getUsers } from "../Redux/usersSlice";
import useData from "../customHooks/useData";
import { useSelector, useDispatch } from "react-redux";

function Plotly() {
  const [foundUser, setFoundUser] = useState([]);
  let dispatch = useDispatch();
  //const { users, status, isAdmin } = useSelector((state) => state.users);
  //let users = dispatch(getUsers());
  //console.log("users: ", users);
  let newData = useData();
  let newDates = [];
  let newValues = [];
  let { id } = useParams();
  const sample = [
    {
      category: "A",
      values: newValues,
      dates: newDates,
    },
  ];
  const [data, setData] = useState([]);

  //   useEffect(() => {
  //     dispatch(getUsers());
  //     findUser();
  //   }, []);

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

  //   const findUser = () => {
  //     let user = users.filter((user) => user._id === id);
  //     setFoundUser(user[0]);
  //   };

  return (
    <div>
      {/* <div style={{ textAlign: "center" }}>
        <h2 style={{ marginBottom: "1rem", color: "#fff" }}>
          {foundUser ? `performance page for ${foundUser.name}` : null}
        </h2>
      </div> */}
      <div>
        <button onClick={handleClick} id="A">
          {/* {foundUser ? `performance page for ${foundUser.name}` : null} */}
          Get Performance
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
