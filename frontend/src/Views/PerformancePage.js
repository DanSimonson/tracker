import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUsers } from "../Redux/usersSlice";
import { useSelector, useDispatch } from "react-redux";
import useAuth from "../customHooks/useAuth";
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
  const [foundUser, setFoundUser] = useState([]);
  let tokenedUser = useAuth();
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let { id } = useParams();
  const { users, status, isAdmin } = useSelector((state) => state.users);
  const data = [
    { name: "Facebook", users: 2000000000 },
    { name: "Instagram", users: 1500000000 },
    { name: "Twiter", users: 1000000000 },
    { name: "Telegram", users: 500000000 },
  ];
  const dataArea = [];

  useEffect(() => {
    dispatch(getUsers());
    findUser();
    findTimes();
  }, []);

  const findTimes = async () => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    try {
      let { data } = await axios.get("/api/timer/");
      const result = data.timers.filter((time) => time.user_id === user._id);
      console.log("timers: ", result);
    } catch (error) {
      console.log("error: ", error);
    }
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
    <div style={{ textAlign: "center" }}>
      <h2 style={{ marginBottom: "1rem", color: "#fff" }}>
        {foundUser ? `performance page for ${foundUser.name}` : null}
      </h2>
      <div className="performanceApp">
        <PieChart width={400} height={400}>
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
        </PieChart>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 80,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="users" fill="#8884d8" background={{ fill: "#eee" }} />
        </BarChart>
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
