import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../customHooks/useAuth";
import "./Clock.scss";
import { format } from "date-fns";
import { getTimers, timerAdded, setTimers } from "../../Redux/timersSlice";
import Navbar from "../Navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";

export default function Clock() {
  const [timerData, setTimerData] = useState("");
  const [calc, setCalc] = useState(false);
  const [mins, setMins] = useState("");
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(1);
  const [start, setStart] = useState(false);
  const [timerStart, setTimerStart] = useState(0);
  const [timerEnd, setTimerEnd] = useState(0);
  const [totalTime, setTotalTime] = useState("");
  const [res, setRes] = useState("");
  const [displayMessage, setDisplayMessage] = useState(false);
  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;
  let tokenedUser = useAuth();
  let dispatch = useDispatch();

  useEffect(async () => {
    let interval = setInterval(() => {
      clearInterval(interval);
      if (start) {
        if (seconds === 0) {
          if (minutes !== 0) {
            setSeconds(59);
            setMinutes(minutes - 1);
          } else {
            setCalc(false);
            setStart(false);
            setSeconds(1);
            setMinutes(0);
            setDisplayMessage(!displayMessage);
            axios.get("/api/timer/").then((res) => {
              let date = new Date().toISOString().substr(0, 10);
              FormData(
                {
                  time: parseFloat(totalTime * 60),
                  user_id: tokenedUser._id,
                  name: tokenedUser.name,
                },
                res.data.timers,
                date
              );
            });
          }
        } else {
          setSeconds(seconds - 1);
        }
      }
    }, 1000);

    if (calc) {
      let time = parseFloat(res);
      let user_id = tokenedUser._id;
      let name = tokenedUser.name;

      try {
        let { data } = await axios.get("/api/timer/");
        let date = new Date().toISOString().substr(0, 10);
        FormData(
          { time: time, user_id: user_id, name: name },
          data.timers,
          date
        );
      } catch (error) {
        console.log("error: ", error);
      }
      setCalc(false);
      setStart(false);
      setSeconds(1);
      setMinutes(0);
      setDisplayMessage(!displayMessage);
    }
  }, [seconds]);

  const handleChange = (e) => {
    setMins(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setTotalTime(mins);
    setRes(mins);
    setMinutes(mins);
    setTimerStart(mins);
    setSeconds(0);
    setStart(true);
    setMins("");
  };
  const resetClock = async (e) => {
    e.preventDefault();

    /*
    create new timer in backend. set the timer value, user_id and user name.
    */
    if (minutes === 0) {
      if (res === "1") {
        setRes(seconds);
      } else {
        setRes(res * 60 - seconds);
      }
    } else {
      let left = minutes * 60 + seconds;
      setRes(res * 60 - left);
    }
    setCalc(true);
  };
  const FormData = async (newData, data, date) => {
    console.log("newData: ", newData);
    console.log("data: ", data);
    const user = JSON.parse(localStorage.getItem("userInfo"));
    let result = data.filter((time) => time.user_id === user._id);
    const duplicate = result.map((item) => {
      if (item.updatedAt.substr(0, 10) === date) {
        return item;
      }
    });
    let tempArr = duplicate.slice(-1);
    if (tempArr.includes(undefined)) {
      try {
        dispatch(setTimers(newData));
      } catch (error) {
        console.log("error: ", error.message);
      }
    } else {
      let newTimer = tempArr[0].time + newData.time;
      newData.time = newTimer;
      console.log("newData: ", newData);
      try {
        const response = await axios.delete("/api/timer/" + tempArr[0]._id);
        if (response.statusText === "OK") {
          try {
            dispatch(setTimers(newData));
          } catch (error) {
            console.log("error: ", error.message);
          }
        }
      } catch (error) {
        console.log("error: ", error.message);
      }
    }
  };

  return (
    <>
      <div className="container">
        <div className="subContainer glass">
          <div className="pomodoro">
            <div className="timer">
              {start ? (
                <div>
                  {timerMinutes}:{timerSeconds}
                </div>
              ) : (
                <div>00:00</div>
              )}
            </div>
          </div>
          <div className="form-container">
            <form className="register-form " onSubmit={handleSubmit}>
              <input
                className="mainInput"
                value={mins}
                onChange={handleChange}
                id="min"
                className="form-field"
                type="number"
                placeholder="Minutes"
                name="min"
              />
              <button className="btn btn-background-slide">Start</button>
              <button
                className="btn btn-background-circle"
                onClick={(e) => resetClock(e)}
              >
                Stop
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
