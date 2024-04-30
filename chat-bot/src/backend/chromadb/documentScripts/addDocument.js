import fs from "fs";
import ollama from "ollama";
import { ChromaClient } from "chromadb";

try {
  const client = new ChromaClient();
  const collection = await client.getCollection({ name: "webdev" });

  const filePaths = [
    "D:/projects/ai-assistant/chat-bot/src/backend/chromadb/documentScripts/webdev.txt",
  ]; // Array containing file names add more if needed,

  for (let i = 0; i < filePaths.length; i++) {
    const fileName = filePaths[i];
    const text = fs.readFileSync(fileName, "utf-8");

    const response = await ollama.embeddings({
      model: "mistral",
      prompt: text,
    });
    
    const embedding = response.embedding;

    await collection.add({
      ids: [String(i)],
      embeddings: [embedding],
      documents: [text],
    });
  }
} catch (error) {
  console.log("error");
}
