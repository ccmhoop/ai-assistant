import "../css/App.css";
import { useState } from "react";
import DropMenu from "../components/DropMenu";
import Stopwatch from "../components/Stopwatch";
import { systemPrompts } from "../model/systemPrompts";
import FormUser from "../components/FormUser";
import ThreeWayToggle from "../components/ThreeWayToggle";
import AiTextArea from "../components/AiTextArea";

export default function App() {

  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [systemPrompt, setSystemPrompt] = useState(systemPrompts.chadz);
  const [temprature, setTemprature] = useState("option 1"); // 1=0 2=0.5 3=1

  return (
    <div className="chat-bot-wrapper">
      <h1 className="app-grid-1">Chadz Bot</h1>  {/*grid 1*/}
      <div className="app-grid-2">
        <AiTextArea response={response}/>
        </div>
      <div className="app-grid-3">
        <FormUser
          systemPrompt={systemPrompt}
          setResponse={setResponse}
          setLoading={setLoading}
        />
      </div>
      <div className="app-grid-4">
        <DropMenu
          systemPrompt={systemPrompt}
          setSystemPrompt={setSystemPrompt}
          optionOne={systemPrompts.chadz}
          optionTwo={systemPrompts.liam}
          optionThree={systemPrompts.mario}
          optionFour={systemPrompts.kier}
        />
        <ThreeWayToggle temprature={temprature} setTemprature={setTemprature}/>
        <div className="submit-stopwatch-container">
          <Stopwatch loading={loading} />
          <button className="submit-button" disabled={loading} form="form-user" type="submit">
            {loading? "loading":"submit"}
          </button>
        </div>
      </div>
    </div>
  )
}
