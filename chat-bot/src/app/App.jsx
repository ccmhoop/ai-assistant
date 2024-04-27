import "../css/App.css";
import { useState, createContext } from "react";
import DropMenu from "../components/DropMenu";
import { systemPrompts } from "../model/systemPrompts";
import FormUser from "../components/FormUser";
import ThreeWayToggle from "../components/ThreeWayToggle";
import AiTextArea from "../components/AiTextArea";
import SubmitTimerContainer from "../components/SubmitTimerContainer";

export const LlmContext = createContext();
export const SettingsContext = createContext();
export const LoadingContext = createContext();

export default function App() {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [systemPrompt, setSystemPrompt] = useState(systemPrompts.chadz);
  const [temprature, setTemprature] = useState("option 1"); // 1=0 2=0.5 3=1

  return (
    <div className="chat-bot-wrapper">
      <h1 className="app-grid-1">Chadz Bot</h1>
      <LlmContext.Provider
        value={{ response, systemPrompt, setResponse, setLoading }}
      >
        <div className="app-grid-2">
          <AiTextArea />
        </div>
        <div className="app-grid-3">
          <FormUser />
        </div>
      </LlmContext.Provider>
      <div className="app-grid-4">
        <SettingsContext.Provider
          value={{
            dropMenu: [systemPrompt, setSystemPrompt],
            threeWayToggle: [temprature, setTemprature],
          }}
        >
          <DropMenu />
          <ThreeWayToggle />
        </SettingsContext.Provider>
        <LoadingContext.Provider value={loading}>
          <SubmitTimerContainer />
        </LoadingContext.Provider>
      </div>
    </div>
  );
}
