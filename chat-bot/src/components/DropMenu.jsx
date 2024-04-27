import "../css/dropMenu.css";
import { systemPrompts } from "../model/systemPrompts";
import { useContext } from "react";
import { SettingsContext } from "../app/App";

export default function DropMenu() {
 const [systemPrompt,setSystemPrompt] = useContext(SettingsContext).dropMenu;

  const handleChange = (event) => {
  setSystemPrompt(event.target.value);
  };

  return (
    <div className="dropMenu-wrapper">
      <label>
        <select
          className="drop-menu"
          value={systemPrompt}
          onChange={handleChange}
        >
          <option value={systemPrompts.chadz}>Chadz</option>
          <option value={systemPrompts.liam}>Liam</option>
          <option value={systemPrompts.mario}>Mario</option>
          <option value={systemPrompts.kier}>Kier</option>
        </select>
      </label>
    </div>
  );
}
