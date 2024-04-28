import "../css/aiText.css"
import { LlmContext } from "../app/App";
import { useContext } from "react";

export default function AiText() {
  return (
    <textarea
      className="ai-textarea" // <- grid 2
      value={ useContext(LlmContext).response}
      readOnly={true}
      placeholder=""
    />
  );
}