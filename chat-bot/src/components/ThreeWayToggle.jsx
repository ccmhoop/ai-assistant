import PropTypes from "prop-types";
import "../css/threeWayToggle.css"; // Import your CSS file

export default function ThreeWayToggle({ temprature, setTemprature }) {
  
  ThreeWayToggle.propTypes = {
    setTemprature: PropTypes.func,
    temprature: PropTypes.string
  };

  const handleToggle = () => {
    const options = ["option 1", "option 2", "option 3"];
    const currentIndex = options.indexOf(temprature);
    const nextIndex = (currentIndex + 1) % options.length;
    setTemprature(options[nextIndex]);
  };

  return (
    <div className="toggle-switch">
      <button
        className={`option ${temprature.toLowerCase().replace(" ", "-")}`}
        onClick={handleToggle}
      >
      </button>
    </div>
  );
}