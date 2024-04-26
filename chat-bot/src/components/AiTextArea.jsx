import PropTypes from "prop-types";
import "../css/smallComponents.css";

export default function AiTextArea({ response }) {
  AiTextArea.propTypes = {
    response: PropTypes.string,
  };

  return (
    <textarea
      className="ai-textarea" // <- grid 2
      value={response}
      readOnly={true}
      placeholder=""
    />
  );
}
