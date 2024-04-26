import PropTypes from "prop-types";
import "../css/formUser.css";
import { llmSubmit } from "../api/llm";
import { useState } from "react";

export default function FormUser({systemPrompt, setResponse, setLoading,}) {
  
  FormUser.propTypes = {
    systemPrompt: PropTypes.string,
    setResponse: PropTypes.func,
    setLoading: PropTypes.func,
  };
  
  const [prompt, setPrompt] = useState("");

  return (
    <form
      id={"form-user"}
      className="form-wrapper"
      onSubmit={async (e) => {
        await llmSubmit(e, prompt, setResponse, setLoading, systemPrompt);
      }}
    >
      <textarea
        className="user-textarea"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask for anything!"
      />
    </form>
  )
}
