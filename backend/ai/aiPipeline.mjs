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
      <|start_header_id|>system<|end_header_id|> ${instructions}<|eot_id|>
      <|start_header_id|>context<|end_header_id|> ${dbResults.documents}<|eot_id|>
      <|start_header_id|>user<|end_header_id|> ${prompt}<|eot_id|>
      <|start_header_id|>assistant<|end_header_id|> ${chathistory}<|eot_id|>
      <|start_header_id|>response<|end_header_id|>
    `,
  });
  
  // context : {${dbResults.documents}.} 
  // chatHistory : {${chathistory}.}

  


  // Very basic chat history
  chathistory += `user : {${prompt}} ai : {${generateResponse.response}} \n`;

  return generateResponse.response;
}
