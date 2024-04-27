import "../css/smallComponents.css";
import { LlmContext } from "../app/App";
import { useContext } from "react";

export default function AiTextArea() {
  return (
    <textarea
      className="ai-textarea" // <- grid 2
      value={ useContext(LlmContext).response}
      readOnly={true}
      placeholder=""
    />
  );
}
