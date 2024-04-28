import "../css/formUser.css";
import { llmSubmit } from "../llm/llmApi";
import { LlmContext } from "../app/App";
import { useContext, useState } from "react";

export default function FormUser() {
  const llmValues = useContext(LlmContext);
  const [prompt, setPrompt] = useState("");

  return (
    <form
      id={"form-user"}
      className="form-wrapper"
      onSubmit={async (e) => { // -> src/chromaDB/api/llm.js
        await llmSubmit(e, prompt, llmValues.setResponse, llmValues.setLoading);
      }}
    >
      <textarea
        className="user-textarea"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask for anything!"
      />
    </form>
  );
}
