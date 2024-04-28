import "../css/submitTimer.css";
import { useEffect, useRef, useState, useContext } from "react";
import { LoadingContext } from "../app/App";

export default function Timer() {
  const [clock, setClock] = useState("0:00");
  const loading = useContext(LoadingContext);
  const seconds = useRef(0);

  useEffect(() => {
    let timer = null;
    if (loading) {
      timer = setInterval(() => {
        seconds.current += 1;
        setClock(
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
  }, [loading, seconds, setClock]);

  return <div className="timer">{clock}</div>;
}
