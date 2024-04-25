import "../css/App.css";
import { useState } from "react";
import DropMenu from "../components/DropMenu";
import Stopwatch from "../components/Stopwatch";
import { systemPrompts } from "../model/systemPrompts";
import FormUser from "../components/FormUser";
import ThreeWayToggle from "../components/ThreeWayToggle";

export default function App() {

  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [stopwatch, setStopwatch] = useState("0:00");
  const [systemPrompt, setSystemPrompt] = useState(systemPrompts.chadz);
  const [temprature, setTemprature] = useState("option 1"); // 1=0 2=0.5 3=1

  return (
    <div className="chat-bot-wrapper">
    
      <h1 className="title">Chadz Bot</h1>  {/*grid 1*/}
      <textarea
        className="ai-textarea" // <- grid 2
        value={response}
        readOnly={true}
        placeholder=""
      />
      <div className="app-grid-3">
        <FormUser
          prompt={prompt}
          systemPrompt={systemPrompt}
          loading={loading}
          setPrompt={setPrompt}
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
          <Stopwatch
            loading={loading}
            stopwatch={stopwatch}
            setStopwatch={setStopwatch}
          />
          <button className="submit-button" disabled={loading} form="form-user" type="submit">
            {loading? "loading":"submit"}
          </button>
        </div>
      </div>
    </div>
  )
}
