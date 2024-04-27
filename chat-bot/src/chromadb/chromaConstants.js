import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama";
import { Ollama } from "@langchain/community/llms/ollama";

export const ollamaModel = new Ollama({
    baseUrl: "http://127.0.0.1:11434",
    model: "mistral",
    temperature: 0,
    maxTokens: 100,
  });

export const ollamaEmbeddings = new OllamaEmbeddings({
    baseUrl:"http://127.0.0.1:11434",
    model:"mistral"
});