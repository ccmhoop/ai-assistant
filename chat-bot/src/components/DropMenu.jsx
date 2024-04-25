import PropTypes from "prop-types";
import '../css/dropMenu.css'

export default function DropMenu({ systemPrompt, setSystemPrompt, optionOne, optionTwo, optionThree, optionFour }) {

  DropMenu.propTypes = {
    systemPrompt: PropTypes.string,
    setSystemPrompt: PropTypes.func,
    optionOne: PropTypes.string,
    optionTwo: PropTypes.string,
    optionThree: PropTypes.string,
    optionFour: PropTypes.string,
  };

  const handleChange = (event) => {
    setSystemPrompt(event.target.value);
  }
  
  return (
    <div className="dropMenu-wrapper">
      <label>
        <select className="drop-menu" value={systemPrompt} onChange={handleChange}>
          <option value={optionOne}>Chadz</option>
          <option value={optionTwo}>Liam</option>
          <option value={optionThree}>Mario</option>
          <option value={optionFour}>Kier</option>
        </select>
      </label>
    </div>
  )
}
