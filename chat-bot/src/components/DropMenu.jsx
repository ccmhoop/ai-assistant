import PropTypes from "prop-types";
import '../css/settings.css'

export default function DropMenu({ model, setModel }) {

  DropMenu.propTypes = {
    model: PropTypes.string,
    setModel: PropTypes.func
  };

  const handleChange = (event) => setModel(event.target.value);

  return (
    <div className="dropMenu-wrapper">
      <label>
        <select className="drop-menu" value={model} onChange={handleChange}>
          <option value="chadz">Chadz</option>
          <option value="chris">Chris</option>
          <option value="kier">Kier</option>
          <option value="mario">Mario</option>
          <option value="llama2">llama2</option>
        </select>
      </label>
    </div>
  );
}
