import { useContext, useState, useEffect, useRef } from "react";
import { LoadingContext } from "../app/App";
import { model, ollamaApiGenerate } from "../../globalVars.mjs";
import axios from "axios";
import "../css/chatInputCss.css";

export default function ChatInputComponent() {
  const textareaRef = useRef(null);
  const loading = useContext(LoadingContext).loading;
  const chatHistory = useContext(LoadingContext);
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "1em";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [prompt]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    chatHistory.setLoading(true);

    try {
      if (prompt.trim().length !== 0) {
        const message = prompt;
        chatHistory.setUserChat(prompt);
        setPrompt("");
        const response = await axios.post(ollamaApiGenerate, {
          model,
          prompt: message,
        });
        chatHistory.setUserChat("");
        chatHistory.setResponse(response.data.response);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      chatHistory.setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (
      e.key === "Enter" &&
      !e.shiftKey &&
      !loading &&
      prompt.trim().length !== 0
    ) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="buttons-textarea-container">
      <button className="document-button"></button>
      <textarea
        ref={textareaRef}
        className="user-textarea"
        onSubmit={handleSubmit}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask for anything!"
      />
      <button
        className= {`submit-button ${prompt.trim().length !== 0? "submit-button-active":""}`}
        disabled={loading}
        onClick={handleSubmit}
      >
      </button>
    </div>
  );
}
