import PropTypes from "prop-types";
import "../css/smallComponents.css";
import { useEffect, useRef, useState } from "react";

export default function Stopwatch({ loading }) {
  Stopwatch.propTypes = {
    loading: PropTypes.bool,
    stopwatch: PropTypes.string,
    setStopwatch: PropTypes.func,
  };

  const [stopwatch, setStopwatch] = useState("0:00");

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

  return <div className="submit-stopwatch">{stopwatch}</div>;
}
