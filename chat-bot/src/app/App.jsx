import "../css/App.css";
import { useState, createContext } from "react";
import FormUser from "../components/FormUser";
import SubmitTimerContainer from "../components/SubmitTimerContainer";
import AiText from "../components/AiText";

export const LoadingContext = createContext();

export default function App() {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="chat-bot-wrapper">
      <h1 className="app-grid-1">Chadz Bot</h1>
      <LoadingContext.Provider value={{ response, loading, setResponse, setLoading }}>
        <div className="app-grid-2">
          <AiText />
        </div>
        <div className="app-grid-3">
          <FormUser />
          <SubmitTimerContainer />
        </div>
      </LoadingContext.Provider>
    </div>
  );
}
