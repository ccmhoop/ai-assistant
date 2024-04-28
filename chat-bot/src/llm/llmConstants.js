import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama";
import { Ollama } from "@langchain/community/llms/ollama";

const baseUrl = "http://127.0.0.1:11434"
const aiModel = "mistral";

export const model = new Ollama({
    baseUrl: baseUrl,
    model: aiModel,
    temperature: .5,
    maxTokens: 500,
  });

export const embedding = new OllamaEmbeddings({
    baseUrl: baseUrl,
    model: aiModel,
});