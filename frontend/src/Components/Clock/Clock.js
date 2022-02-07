import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../customHooks/useAuth";
import useData from "../../customHooks/useData";
import { add } from "../../Redux/timerSlice";
import { useDispatch, useSelector } from "react-redux";
import "./Clock.scss";

export default function Clock() {
  const [calc, setCalc] = useState(false);
  const [mins, setMins] = useState("");
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(1);
  const [start, setStart] = useState(false);
  const [timerStart, setTimerStart] = useState(0);
  const [timerEnd, setTimerEnd] = useState(0);
  const [res, setRes] = useState("");
  const [displayMessage, setDisplayMessage] = useState(false);
  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;
  let tokenedUser = useAuth();
  const dispatch = useDispatch();

  useEffect(async () => {
    let interval = setInterval(() => {
      clearInterval(interval);
      if (start) {
        if (seconds === 0) {
          if (minutes !== 0) {
            setSeconds(59);
            setMinutes(minutes - 1);
          } else {
            let minutes = displayMessage ? "" : "";
            let seconds = 0;

            setSeconds(seconds);
            setMinutes(minutes);
            setDisplayMessage(!displayMessage);
            setRes(0);
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
        let temp = await axios.post("/api/timer/", {
          time,
          user_id,
          name,
        });
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

  return (
    <div className="container">
      <div className="pomodoro">
        <div className="message">
          {displayMessage && <div>Start Timer</div>}
        </div>
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
        <form className="register-form" onSubmit={handleSubmit}>
          <input
            value={mins}
            onChange={handleChange}
            id="min"
            className="form-field"
            type="number"
            placeholder="Minutes"
            name="min"
          />
          <button className="form-field" type="submit">
            Start
          </button>
          <button className="form-field" onClick={(e) => resetClock(e)}>
            Stop
          </button>
        </form>
      </div>
    </div>
  );
}
