import PropTypes from "prop-types";
import '../css/settings.css'

export default function DropMenu({ model, setModel, personalityOne, personalityTwo,personalityThree, personalityFour  }) {

  DropMenu.propTypes = {
    model: PropTypes.string,
    setModel: PropTypes.func,
    personalityOne: PropTypes.string,
    personalityTwo: PropTypes.string,
    personalityThree: PropTypes.string,
    personalityFour: PropTypes.string,
  };

  const handleChange = (event) => {
    setModel(event.target.value);
  }
  
  return (
    <div className="dropMenu-wrapper">
      <label>
        <select className="drop-menu" value={model} onChange={handleChange}>
          <option value={personalityOne}>Chadz</option>
          <option value={personalityTwo}>Liam</option>
          <option value={personalityThree}>Mario</option>
          <option value={personalityFour}>Kier</option>
        </select>
      </label>
    </div>
  );
}
