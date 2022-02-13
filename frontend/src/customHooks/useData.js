import React, { useEffect, useState } from "react";
import axios from "axios";
// import {
//   ResponsiveContainer,
//   AreaChart,
//   Area,
//   PieChart,
//   Pie,
//   Tooltip,
//   BarChart,
//   XAxis,
//   YAxis,
//   Legend,
//   CartesianGrid,
//   Bar,
// } from "recharts";

const useData = () => {
  const [exportChart, setExportChart] = useState([]);
  const [chart, setChart] = useState([]);
  const barData = [];
  let dataResult = [];
  let dataResultOne = [];
  let dataResultTwo = [];
  let dataResultThree = [];
  let dataResultFour = [];
  let dataResultFive = [];
  let dataResultSix = [];
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
      //console.log("data: ", data);
      const result = data.timers.filter((time) => time.user_id === user._id);
      for (let i = 0; i < result.length; i++) {
        barData.push({
          date: result[i].updatedAt.substr(0, 10),
          value: result[i].time,
        });
      }

      for (let i = 0; i < barData.length; i++) {
        indx = i + 1;

        if (dataResult.length === 0) {
          dataResult = barData.filter((e) => e.date === barData[i].date);
          tempData = calcChartData(dataResult, i);
          setChart(tempData);
        } else if (i === dataResult.length) {
          dataResultOne = barData.filter((e) => e.date === barData[i].date);
          tempData = calcChartData(dataResultOne, i);
          setChart(tempData);
        } else if (i === dataResult.length + dataResultOne.length) {
          dataResultTwo = barData.filter((e) => e.date === barData[i].date);
          tempData = calcChartData(dataResultTwo, i);
          setChart(tempData);
        } else if (
          i ===
          dataResult.length + dataResultOne.length + dataResultTwo.length
        ) {
          dataResultThree = barData.filter((e) => e.date === barData[i].date);
          tempData = calcChartData(dataResultThree, i);
          setChart(tempData);
        } else if (
          i ===
          dataResult.length +
            dataResultOne.length +
            dataResultTwo.length +
            dataResultThree.length
        ) {
          dataResultFour = barData.filter((e) => e.date === barData[i].date);
          tempData = calcChartData(dataResultFour, i);
          setChart(tempData);
        } else if (
          i ===
          dataResult.length +
            dataResultOne.length +
            dataResultTwo.length +
            dataResultThree.length +
            dataResultFour.length
        ) {
          dataResultFive = barData.filter((e) => e.date === barData[i].date);
          tempData = calcChartData(dataResultFive, i);
          setChart(tempData);
        } else if (
          i ===
          dataResult.length +
            dataResultOne.length +
            dataResultTwo.length +
            dataResultThree.length +
            dataResultFour.length +
            dataResultFive.length
        ) {
          dataResultSix = barData.filter((e) => e.date === barData[i].date);
          tempData = calcChartData(dataResultSix, i);
          setChart(tempData);
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
  //console.log("chart: ", chart);
  //return { chart };
  //return true
};

export default useData;
