import "../css/formUser.css";
import { llmSubmit } from "../chromadb/api/llm";
import { LlmContext } from "../app/App";
import { useContext, useState } from "react";

export default function FormUser() {
  const llmValues = useContext(LlmContext);
  const [prompt, setPrompt] = useState("");

  return (
    <form
      id={"form-user"}
      className="form-wrapper"
      onSubmit={async (e) => { // -> src/api/llm.js
        await llmSubmit(e, prompt, llmValues.setResponse, llmValues.setLoading, llmValues.systemPrompt);
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
