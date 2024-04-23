import PropTypes from "prop-types";
import "../css/formSubmit.css";
import DropMenu from "../components/DropMenu";
import Stopwatch from "../components/Stopwatch";
import { llmSubmit } from "../api/llm";

export default function FormSubmit({
  prompt,
  model,
  loading,
  stopwatch,
  setPrompt,
  setModel,
  setResponse,
  setLoading,
  setStopwatch,
}) {
  FormSubmit.propTypes = {
    prompt: PropTypes.string,
    model: PropTypes.string,
    loading: PropTypes.bool,
    stopwatch: PropTypes.string,
    setPrompt: PropTypes.func,
    setModel: PropTypes.func,
    setStopwatch: PropTypes.func,
    setResponse: PropTypes.func,
    setLoading: PropTypes.func,
  };

  return (
    <>
      <form
        className="form-wrapper"
        // -> Warning Important! set this function correctly handleSubmit(event, prompt, model, setResponse, setLoading)
        onSubmit={async (e) => {
          await llmSubmit(e, prompt, setResponse);
        }}
      >
        <div className="user-submit-container">
          <div className="user-settings-container">
            <textarea
              className="user-textarea"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask for anything!"
            />
            <div className="user-settings">
              <DropMenu model={model} setModel={setModel} />
              <Stopwatch
                loading={loading}
                stopwatch={stopwatch}
                setStopwatch={setStopwatch}
              />
              <button
                className="submit-button"
                type="submit"
                disabled={loading}
              >
                {loading ? "Loading" : "Submit"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
