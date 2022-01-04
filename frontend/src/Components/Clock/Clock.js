import React, { useState, useEffect } from "react";
import "./Clock.scss";

export default function Clock() {
  const [mins, setMins] = useState("");
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(1);
  const [start, setStart] = useState(false);
  const [displayMessage, setDisplayMessage] = useState(false);
  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

  useEffect(() => {
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
          }
        } else {
          setSeconds(seconds - 1);
        }
      }
    }, 1000);
  }, [seconds]);

  const handleChange = (e) => {
    setMins(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setMinutes(mins);
    setSeconds(0);
    setStart(true);
    setMins("");
  };
  const resetClock = (e) => {
    e.preventDefault();
    setStart(false);
    setSeconds(1);
    setMinutes(0);
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
