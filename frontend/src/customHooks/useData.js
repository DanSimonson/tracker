import React, { useEffect, useState } from "react";
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

const useData = () => {
  const [chart, setChart] = useState([]);
  const barData = [];
  let dataResult = [];
  let dataResultOne = [];
  let dataResultTwo = [];
  let dataResultThree = [];
  let dataResultFour = [];
  let dataResultFive = [];
  let tempArr = [];
  let tempData = [];
  let indx;

  useEffect(() => {
    findTimes();
  }, []);
  const findTimes = async () => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    try {
      let { data } = await axios.get("/api/timer/");
      const result = data.timers.filter((time) => time.user_id === user._id);
      for (let i = 0; i < result.length; i++) {
        barData.push({
          date: result[i].updatedAt.substr(0, 10),
          value: result[i].time,
        });
      }

      for (let i = 0; i < barData.length; i++) {
        indx = i + 1;
        if (indx <= barData.length - 1) {
          if (dataResult.length === 0) {
            dataResult = barData.filter((e) => e.date === barData[i].date);
            tempData = calcChartData(dataResult, i);
            setChart(tempData);
          } else if (i === dataResult.length) {
            dataResultOne = barData.filter((e) => e.date === barData[i].date);
            tempData = calcChartData(dataResultOne, i);
            setChart(tempData);
          } else if (i === dataResultOne.length) {
            tempData = dataResultTwo = barData.filter(
              (e) => e.date === barData[i].date
            );
          } else if (i === dataResultTwo.length) {
            tempData = dataResultThree = barData.filter(
              (e) => e.date === barData[i].date
            );
          } else if (i === dataResultThree.length) {
            tempData = dataResultFour = barData.filter(
              (e) => e.date === barData[i].date
            );
          } else if (i === dataResultFour.length) {
            tempData = dataResultFive = barData.filter(
              (e) => e.date === barData[i].date
            );
          }
        }
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };
  const calcChartData = (dataArray, index) => {
    let totalValue = dataArray.reduce((acc, item) => acc + item.value, 0);
    let newElement = {
      date: dataArray[0].date,
      value: totalValue,
    };
    tempArr.push(newElement);
    return tempArr;
  };
  return { chart };
};

export default useData;
