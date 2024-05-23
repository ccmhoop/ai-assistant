import "../css/chatHistoryCss.css";
import { LoadingContext } from "../app/App";
import { useContext, useState, useEffect } from "react";

export default function ChatHistoryComponent() {
  const { response } = useContext(LoadingContext);
  const { userChat } = useContext(LoadingContext);
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    if (userChat) {
      setChatHistory((prevHistory) => [...prevHistory, { sender: 'user', message: userChat }]);
    }
  }, [userChat]);

  useEffect(() => {
    if (response) {
      setChatHistory((prevHistory) => [...prevHistory, { sender: 'ai', message: response }]);
    }
  }, [response]);

  return (
    <div className="chat-container">
      {chatHistory.map((chat, index) => (
        <div key={index} className={`chat-message ${chat.sender}`}>
          {chat.message}
        </div>
      ))}
    </div>
  );
}
