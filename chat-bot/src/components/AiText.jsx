import "../css/aiText.css";
import { LoadingContext } from "../app/App";
import { useContext } from "react";

export default function AiText() {
  return (
    <textarea
      className="ai-textarea" // <- grid 2
      value={useContext(LoadingContext).response}
      readOnly={true}
      placeholder=""
    />
  );
}
