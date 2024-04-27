import "../css/smallComponents.css";
import { LlmContext } from "../app/App";
import { useContext } from "react";

export default function AiTextArea() {

  const response = useContext(LlmContext).response;

  return (
    <textarea
      className="ai-textarea" // <- grid 2
      value={response}
      readOnly={true}
      placeholder=""
    />
  );
}
