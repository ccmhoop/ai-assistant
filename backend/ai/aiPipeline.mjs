import { model, embeddingModel } from "../../globalVars.mjs";
import { instructions, nResults, options } from "./aiSettings.mjs";

export default async function aiPipeline(ollama, prompt, collection) {

  // Chromdb embeddings is initialized with user prompt
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
      system  : ${instructions}. 
      context : ${dbResults.documents}. 
      question: ${prompt}.
      `,
  });

  return generateResponse.response;
}
