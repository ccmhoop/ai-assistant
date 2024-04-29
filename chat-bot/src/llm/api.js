
import ollama from "ollama";
import { ChromaClient } from "chromadb";

const prompt = "what is in the bronze package?"

const client = new ChromaClient();

const response = await ollama.embeddings({
  prompt: prompt,
  model: "mistral",

});
const collection = await client.getCollection({ name: "webdev"});
    
const results = await collection.query({
  queryEmbeddings: [response.embedding],
  nResults: 1,
});

let generatedOutput = await ollama.generate({
  model: "mistral",
  prompt: `Using this data: ${results.documents}. Respond to this prompt: ${prompt}`
});
console.log(generatedOutput.response);
