import ChatHistoryComponent from "../components/ChatHistoryComponent";
import ChatInputComponent from "../components/ChatInputComponent";
import "../css/App.css";
import { useState, createContext } from "react";

export const LoadingContext = createContext();

export default function App() {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [userChat, setUserChat] = useState("");

  return (
    <LoadingContext.Provider
      value={{
        response,
        loading,
        userChat,
        setResponse,
        setLoading,
        setUserChat,
      }}
    >
      <div className="app-wrapper">
        <header className="header item-1">Test Title</header>
        <div className="chat-history item-2">
          <ChatHistoryComponent />
        </div>
        <footer className="chat-bar item-3">
          <ChatInputComponent />
        </footer>
      </div>
    </LoadingContext.Provider>
  );
}
