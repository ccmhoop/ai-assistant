import fs from "fs/promises";
import { Ollama } from "ollama";
import { embeddingModel, collectionName } from "../../../globalVars.mjs";
import { ChromaClient } from "chromadb";
import natural from "natural";
import folderLoader from "../dbHelpers/folderLoader.mjs";

const ollama = new Ollama();
const client = new ChromaClient();
const collection = await client.getCollection({ name: collectionName });
const tokenizer = new natural.SentenceTokenizer();
const folderData = await folderLoader();
const filePaths = folderData.filePaths;
const textFileNames = folderData.textFileNames;

async function sentenceChunker(text, maxSentences) {
  const sentences = tokenizer.tokenize(text);
  let chunks = [];
  let currentChunk = [];
  let sentenceCount = 0;

  sentences.forEach((sentence) => {
    if (sentenceCount + 1 <= maxSentences) {
      currentChunk.push(sentence);
      sentenceCount += 1;
    } else {
      chunks.push(currentChunk.join(" "));
      currentChunk = [sentence];
      sentenceCount = 1;
    }
  });
  if (currentChunk.length > 0) {
    chunks.push(currentChunk.join(" "));
  }
  return chunks;
}

async function batchEmbeddings(textChunks, model) {
  const responses = await Promise.all(
    textChunks.map((chunk) => ollama.embeddings({ model, prompt: chunk }))
  );
  return responses.map((response) => response.embedding);
}

export async function sentenceSplitter(maxSentences) {
  try {
    for (let i = 0; i < filePaths.length; i++) {
      const fileContents = await fs.readFile(filePaths[i], "utf-8");
      const chunks = await sentenceChunker(fileContents, maxSentences);
      const embeddings = await batchEmbeddings(chunks, embeddingModel);

      for (let j = 0; j < chunks.length; j++) {
        await collection.add({
          ids: [`id-${j + "-" + textFileNames[i]}`],
          metadatas: [{ source: `${filePaths[i]}` }],
          embeddings: [embeddings[j]],
          documents: [chunks[j]],
        });
        console.log(`id-${j + "-" + textFileNames[i]}`);
      }
    }
  } catch (error) {
    console.error("Error reading file:", error);
  }
}
