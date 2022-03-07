import React, { useState, useEffect } from "react";
import { secondsToHours, secondsToMinutes } from "date-fns";
import "./Message.scss";
import Calculate from "../../Utils/Calculate";

function Message(props) {
  let { chart, user } = props;
  const [totalTime, setTotalTime] = useState(0);
  const [fdTime, setFDTime] = useState(0);
  const [isObject, setIsObject] = useState(false);
  let totalsMessage;
  let fdMessage;
  let timesSum = 0;
  let fdSum = 0;
  let totalMinutes = 0;
  let fdMinutes = 0;
  let totalsHours = 0;
  let fdHours = 0;
  let result = chart.filter((time) => time.user_id === user._id);
  let times = result.map((element) => element.time);
  if (times.length > 0) {
    timesSum = times.reduce(
      (accumulator, currentValue) => accumulator + currentValue
    );
  }
  let fiveDays = result.slice(result.length - 5);
  let fiveDaysTimes = fiveDays.map((fTime) => fTime.time);
  if (fiveDaysTimes.length > 0) {
    fdSum = fiveDaysTimes.reduce(
      (accumulator, currentValue) => accumulator + currentValue
    );
  }
  let sums = Calculate(timesSum, fdSum);
  if (Object.entries(sums).length === 0) {
    //do nothing
  } else {
    //total sums
    if (sums.totalSums.totalSum !== 0) {
      if (sums.totalSums.totalSum < 60) {
        totalsMessage = (
          <h2>
            You have an overall total of <span>{sums.totalSums.totalSum}</span>{" "}
            seconds of development time
          </h2>
        );
      } else if (sums.totalSums.totalMinutes < 60) {
        totalsMessage = (
          <h2>
            You have an overall total of{" "}
            <span>{sums.totalSums.totalMinutes}</span> minutes of development
            time
          </h2>
        );
      } else if (sums.totalSums.totalHours >= 1) {
        totalsMessage = (
          <h2>
            You have an overall total of{" "}
            <span>{sums.totalSums.totalHours}</span> hours of development time
          </h2>
        );
      }
    }
    //fd sums
    if (sums.fdSums.fdSum !== 0) {
      if (sums.fdSums.fdSum < 60) {
        fdMessage = (
          <h2>
            You have a five day total of <span>{sums.fdSums.fdSum}</span>{" "}
            seconds of development time
          </h2>
        );
      } else if (sums.fdSums.fdMinutes < 60) {
        fdMessage = (
          <h2>
            You have a five day total of <span>{sums.fdSums.fdMinutes}</span>{" "}
            minutes of development time
          </h2>
        );
      } else if (sums.fdSums.fdHours >= 1) {
        fdMessage = (
          <h2>
            You have a five day total of <span>{sums.fdSums.fdHours}</span>{" "}
            hours of development time
          </h2>
        );
      }
    }
  }

  return (
    <div className="messageContainer">
      <h1 className="headerMessage">
        {Object.entries(sums).length === 0
          ? null
          : "Total and Five Day Performance"}{" "}
      </h1>
      {totalsMessage}
      {fdMessage}
    </div>
  );
}
export default Message;
