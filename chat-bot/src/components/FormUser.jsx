import PropTypes from "prop-types";
import "../css/formSubmit.css";
import { llmSubmit } from "../api/llm";

export default function FormUser({
  prompt,
  systemPrompt,
  setPrompt,
  setResponse,
  setLoading,
}) {
    FormUser.propTypes = {
    prompt: PropTypes.string,
    systemPrompt: PropTypes.string,
    loading: PropTypes.bool,
    setPrompt: PropTypes.func,
    setResponse: PropTypes.func,
    setLoading: PropTypes.func,
  };

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
  );
}
