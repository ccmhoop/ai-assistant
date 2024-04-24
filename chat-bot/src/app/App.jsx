import "../css/App.css";
import { useState } from "react";
import FormSubmit from "../components/FormSubmit";
import DropMenu from "../components/DropMenu";
import Stopwatch from "../components/Stopwatch";
import {personalities}  from "../model/personalities";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [stopwatch, setStopwatch] = useState("0:00");
  const [model, setModel] = useState(personalities.chadz);


  return (
    <div className="chat-bot-wrapper">
      <h1 className="title">Chadz Bot</h1>
      <textarea
        className="ai-textarea"
        value={response}
        readOnly={true}
        placeholder=""
      />
      <FormSubmit
        prompt={prompt}
        model={model}
        loading={loading}
        setPrompt={setPrompt}
        setResponse={setResponse}
        setLoading={setLoading}
      />
      <div className="user-settings"> 
      <DropMenu 
        model={model} 
        setModel={setModel} 
        personalityOne={personalities.chadz}
        personalityTwo={personalities.liam}
        personalityThree={personalities.mario}
        personalityFour={personalities.kier}

        />
      <Stopwatch
        loading={loading}
        stopwatch={stopwatch}
        setStopwatch={setStopwatch}
      />
      <button form='user-form' type="submit">click</button>
      </div>
    </div>
  );
}
