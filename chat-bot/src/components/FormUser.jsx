import { useContext, useState } from "react";
import { LoadingContext } from "../app/App";
import axios from "axios";

export default function FormUser() {
  const llmValues = useContext(LoadingContext);
  const [prompt, setPrompt] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    llmValues.setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/api/generate", {
        model: "phi",
        prompt,
      });
      console.log(response);
      llmValues.setResponse(response.data.response);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      llmValues.setLoading(false);
    }
  };

  return (
    <form id="form-user" className="form-wrapper" onSubmit={handleSubmit}>
      <textarea
        className="user-textarea"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask for anything!"
      />
    </form>
  );
}
