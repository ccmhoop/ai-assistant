import { model, embeddingModel } from "../../globalVars.mjs";
import { instructions, nResults, options } from "./aiSettings.mjs";

let chathistory = "";

export default async function aiPipeline(ollama, prompt, collection) {
  // ollama embeddings is initialized with user prompt
  const ollamaEmbedding = await ollama.embeddings({
    model: embeddingModel,
    prompt,
  });

  // fetching data from ChromaDb using the ollamaEmbedding
  const dbResults = await collection.query({
    queryEmbeddings: [ollamaEmbedding.embedding],
    nResults,
  });

  // AI Response generation. AI instructions -> use DB data as context -> process question

  const generateResponse = await ollama.generate({
    model,
    options,
    stream: false,
    prompt: `
    system  : {${instructions}.} 
    chatHistory : {${chathistory}.}
    question: {${prompt}.}
      `,
  });
  
  // context : {${dbResults.documents}.} 

  // Very basic chat history
  chathistory += `user : {${prompt}} ai : {${generateResponse.response}} `;

  return generateResponse.response;
}
