import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUsers } from "../Redux/usersSlice";
import { useSelector, useDispatch } from "react-redux";
import useAuth from "../customHooks/useAuth";
import useData from "../customHooks/useData";
import axios from "axios";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";
import { format, parseISO, subDays } from "date-fns";

const PerformancePage = () => {
  const { chart } = useData();
  console.log("chart: ", chart);
  const [ready, setReady] = useState(false);
  const [foundUser, setFoundUser] = useState([]);
  let tokenedUser = useAuth();
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let { id } = useParams();
  const { users, status, isAdmin } = useSelector((state) => state.users);
  let data = [
    { date: "12-01-10", value: 20 },
    { date: "12-01-12", value: 10 },
    { date: "12-01-13", value: 70 },
    { date: "12-01-14", value: 66 },
    { date: "12-01-15", value: 124 },
  ];
  let d = [
    { date: "2022-01-20", value: 100 },
    { date: "2022-01-28", value: 190 },
  ];
  let dChart = [];
  const dataArea = [];
  const barData = [];
  //let dataRes = [];
  let dataResult = [];
  let dataResultOne = [];
  let dataResultTwo = [];
  let dataResultThree = [];
  let dataResultFour = [];
  let dataResultFive = [];
  let tempArr = [];
  let chData = [];

  useEffect(() => {
    dispatch(getUsers());
    findUser();
  }, []);

  const loadChart = () => {
    for (let i = 0; i < chart.length; i++) {
      chData.push({
        date: chart[i].date,
        value: chart[i].value,
      });
    }
    console.log("chData: ", chData);
    console.log("typeof chData[0].date", typeof chData[0].date);
    console.log("typeof chData[0].value", typeof chData[0].value);

    setReady(true);
    return chData;
  };

  const findUser = () => {
    let user = users.filter((user) => user._id === id);
    setFoundUser(user[0]);
  };

  for (let num = 30; num >= 0; num--) {
    dataArea.push({
      date: subDays(new Date(), num).toISOString().substr(0, 10),
      value: 1 + Math.random(),
    });
  }

  return (
    <>
      <button onClick={loadChart}>chart is true</button>

      <div style={{ textAlign: "center" }}>
        <h2 style={{ marginBottom: "1rem", color: "#fff" }}>
          {foundUser ? `performance page for ${foundUser.name}` : null}
        </h2>
        <div className="performanceApp">
          {/* <PieChart width={400} height={400}>
          <Pie
            dataKey="users"
            isAnimationActive={false}
            data={data}
            cx={200}
            cy={200}
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <Tooltip />
        </PieChart> */}
          {ready === true ? (
            <BarChart
              width={500}
              height={300}
              data={chData}
              margin={{
                top: 5,
                right: 30,
                left: 80,
                bottom: 5,
              }}
              barSize={20}
            >
              <XAxis
                dataKey="date"
                scale="point"
                padding={{ left: 10, right: 10 }}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar
                dataKey="value"
                fill="#8884d8"
                background={{ fill: "#eee" }}
              />
            </BarChart>
          ) : null}
        </div>

        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={dataArea} stroke="#2451b7" fill="url(#color)">
            <defs>
              <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} />
                <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <Area dataKey="value" />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tickFormatter={(str) => {
                const date = parseISO(str);
                if (date.getDate() % 7 === 0) {
                  return format(date, "MMM, d");
                }
                return "";
              }}
            />
            <YAxis
              datakey="value"
              axisLine={false}
              tickLine={false}
              tickCount={8}
              tickFormatter={(number) => `${number.toFixed(2)}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <CartesianGrid opacity={0.1} vertical={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};
function CustomTooltip({ active, payload, label }) {
  if (active) {
    return (
      <div className="tooltip">
        <h4>{format(parseISO(label), "eeee, d MMM, yyyy")}</h4>
        <p>{payload[0].value.toFixed(2)}</p>
      </div>
    );
  }
  return null;
}

export default PerformancePage;

/**
 // const lookup = barData.reduce((a, e) => {
      //   a[e.date] = ++a[e.date] || 0;
      //   return a;
      // }, {});
      //console.log("lookup: ", lookup);
      //get the keys
      //const keys = Object.keys(lookup);
      //place duplicates in arrays
      //let length = keys.length;
      //let tlngth = keys.length - keys.length;
      //console.log("tlngth: ", tlngth);
      // let tempLngth = [];
      // let tempIndex = [];
      // for (let k = 0; k < keys.length; k++) {
      //   tempIndex.push(k);
      //   tempLngth = [...tempLngth, k];
      //   //console.log("tempLngth: ", tempLngth);
      //   //console.log("tempIndex: ", tempIndex);
      // }
      //let l = 1;
      //let myNum = eval(`${keys.length} - l`);
      //console.log("myNum: ", myNum);
      //console.log("length: ", length);

      // for (let i = 0; i < barData.length; i++) {
      //   //console.log("current value if i is: ", i);
      //   for (let j = 0; j < keys.length; j++) {
      //     if (barData[i].date === keys[j]) {
      //       //console.log("barData[i].date === keys[j]: ", barData[i]);
      //       let tempObj = barData[i];
      //       if (dataRes.length === 0) {
      //         dataRes = [...dataRes, tempObj];
      //       } else {
      //         if (j === tempLngth[0]) {
      //           dataRes = [...dataRes, tempObj];
      //         } else if (j === tempLngth[1]) {
      //           dataResTwo = [...dataResTwo, tempObj];
      //         }
      //       }
      //       console.log("dataRes: ", dataRes);
      //       console.log("dataResTwo: ", dataResTwo);
      //     }
      //   }
      // }

      // console.log(
      //   "answer: ",
      //   barData.filter((e) => e.date === barData[4].date)
      // );

      // console.log(
      //   "filtered barData: ",
      //   barData.filter((e) => e.date === "2022-01-20")
      // );
      //let dup = barData.filter((e) => e.date === keys[0]);
      //console.log("dup: ", dup);
      //let count = 0;
      //console.log("lookup: ", lookup);
      // console.log("lookup: ", lookup);
      // for (let look in lookup) {
      //   console.log("look: ", look);
      //   console.log("lookup: ", lookup[look]);
      // }
      //let keys = Object.keys(lookup);
      //console.log("keys: ", keys);
      //let values = Object.values(lookup);
      //console.log("values: ", values);
      //let matrix = Object.entries(lookup);
      //console.log("matrix: ", matrix);
      //console.log("keys.length: ", keys.length);
      //eval(`${keys.length} - l`)
      //let dup = [];
      //let tempVal;
 */
