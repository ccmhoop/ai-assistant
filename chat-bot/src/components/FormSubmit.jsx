import PropTypes from "prop-types";
import "../css/formSubmit.css";
import { llmSubmit } from "../api/llm";

export default function FormSubmit({
  prompt,
  model,
  setPrompt,
  setResponse,
  setLoading,
}) {
  FormSubmit.propTypes = {
    prompt: PropTypes.string,
    model:  PropTypes.string,
    loading: PropTypes.bool,
    setPrompt: PropTypes.func,
    setResponse: PropTypes.func,
    setLoading: PropTypes.func,
  };

  return (
    <form
    id={'user-form'}
      className="form-wrapper"
      onSubmit={async (e) => {
        await llmSubmit(e, prompt, setResponse, setLoading,model);
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
