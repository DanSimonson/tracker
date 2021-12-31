import React, { useState, useEffect } from "react";
import "./Timer.scss";
function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(false);

  useEffect(() => {
    if (isRunning) {
      const id = window.setInterval(() => {
        console.log("seconds: ", seconds);
        setSeconds((seconds) => seconds + 1);
      }, 1000);

      return () => window.clearInterval(id);
    }
    return undefined;
  }, [isRunning]);

  return (
    <div className="app">
      <div className={`time-circle ${isRunning ? "" : "paused"} `}>
        <div className="time">{seconds}</div>
      </div>
      <div className="buttons">
        {isRunning ? (
          <button className="play-pause" onClick={() => setIsRunning(false)}>
            <i className="fa fa-pause fa-2x" />
          </button>
        ) : (
          <button className="play-pause" onClick={() => setIsRunning(true)}>
            <i className="fa fa-play fa-2x" />
          </button>
        )}
        <button
          className="reset"
          //disabled={!isRunning}
          onClick={() => {
            setIsRunning(false);
            setSeconds(0);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
export default Timer;
