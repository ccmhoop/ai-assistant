import '../css/stopwatch.css'
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

export default function Stopwatch({ loading, stopwatch, setStopwatch }) {
  
  Stopwatch.propTypes = {
    loading: PropTypes.bool,
    stopwatch: PropTypes.string,
    setStopwatch: PropTypes.func
  };

  const seconds = useRef(0);

  useEffect(() => {
    let timer = null;
    if (loading) {
      timer = setInterval(() => {
        seconds.current += 1;
        setStopwatch((seconds.current / 60).toFixed(0) + ":" + (seconds.current % 60 < 10 ? "0" : "") + (seconds.current % 60))
      }, 1000);
    }
    return () => {
      seconds.current = 0;
      clearInterval(timer);
    };
  }, [loading, seconds, setStopwatch]);

  return (<div className='submit-stopwatch'>{stopwatch}</div>);
}