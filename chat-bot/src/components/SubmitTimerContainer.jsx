import Timer from "./Timer";
import "../css/App.css";
import { LoadingContext } from "../app/App";
import { useContext } from "react";

export default function SubmitTimerContainer() {

  return (
    <div className="submit-stopwatch-container">
      <Timer/>
      <button
        className="submit-button"
        disabled={useContext(LoadingContext).loading}
        form="form-user"
        type="submit"
      >
        {useContext(LoadingContext).loading ? "loading" : "submit"}
      </button>
    </div>
  );
}
