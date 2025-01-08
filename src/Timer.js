import { useEffect, useState } from "react";

export const Timer = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isStart, setIsStart] = useState(false);
  const [timeId, setTimeId] = useState();

  const handleStart = () => {
    setIsStart(true);
  };

  const runTimer = () => {
    if (seconds > 0) {
      setSeconds(seconds - 1);
    } else if (minutes > 0) {
      setMinutes(minutes - 1);
      setSeconds(59);
    } else if (hours > 0) {
      setHours(hours - 1);
      setMinutes(59);
      setSeconds(59);
    } else {
      setIsStart(false);
      clearInterval(timeId);
    }
  };

  useEffect(() => {
    if (isStart && (hours > 0 || minutes > 0 || seconds > 0)) {
      let intervalId = setInterval(() => {
        runTimer();
      }, 1000);
      setTimeId(intervalId);
    } else if (!isStart) {
      clearInterval(timeId);
    }

    return () => clearInterval(timeId);
  }, [hours, minutes, seconds, isStart]);

  const handlePause = () => {
    //clearInterval(timeId)
    setIsStart(false);
  };

  const handleReset = () => {
    setIsStart(false);
    clearInterval(timeId);
    setSeconds(0);
    setMinutes(0);
    setHours(0);
  };

  return (
    <div>
      <input
        id="hours"
        type="number"
        onChange={(e) => setHours(e.target.value)}
        value={hours}
      />
      <input
        id="minutes"
        type="number"
        onChange={(e) => setMinutes(e.target.value)}
        value={minutes}
      />
      <input
        id="seconds"
        type="number"
        onChange={(e) => setSeconds(e.target.value)}
        value={seconds}
      />
      <button onClick={handleStart}>Start</button>

      <div>
        <span>{hours}</span>
        <span>:</span>
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};
