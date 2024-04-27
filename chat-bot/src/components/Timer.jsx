import "../css/smallComponents.css";
import { useEffect, useRef, useState, useContext } from "react";
import { LoadingContext } from "../app/App";

export default function Timer() {

  const [stopwatch, setStopwatch] = useState("0:00");

  const loading = useContext(LoadingContext);

  const seconds = useRef(0);

  useEffect(() => {
    let timer = null;
    if (loading) {
      timer = setInterval(() => {
        seconds.current += 1;
        setStopwatch(
          Math.floor(seconds.current / 60).toFixed(0) +
            ":" +
            (seconds.current % 60 < 10 ? "0" : "") +
            (seconds.current % 60)
        );
      }, 1000);
    }
    return () => {
      seconds.current = 0;
      clearInterval(timer);
    };
  }, [loading, seconds, setStopwatch]);

  return <div className="timer">{stopwatch}</div>;
}
