//----------AI----------------------------------------------------------------------------------------------------------------
export const model = "llama3";
export const embeddingModel = "nomic-embed-text"

//--------ChromaDB---------------------------- adjust package.json accordingly -----------------------------------------------
export const host = "0.0.0.0";
export const port = 8000;
export const origin = "http://localhost:8000";
export const collectionName = "webdev";
// export const collectionName = "empty";

//--------Ollama--------------------------------------------------------------------------------------------------------------
export const portListener = 3000;
export const ollamaApiGenerate = "http://localhost:3000/api/generate";

//------Document Folder----------------------------------------
export const folderPath = "C:/Users/conner/Documents/coding/ai-assistant/chat-bot/backend/chromadb/documents";