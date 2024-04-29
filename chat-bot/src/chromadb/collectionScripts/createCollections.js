import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama";
import { Chroma } from "@langchain/community/vectorstores/chroma";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

//--------------------------- Document loader/splitter -------------------------------------

const ollamaEmbeddings = new OllamaEmbeddings({
    baseUrl: "http://127.0.0.1:11434",
    model: "mistral",
});

const loader = new TextLoader("D:/projects/ai-assistant/chat-bot/src/chromadb/webdev.txt");

const docs = await loader.load();

// Creates a text splitter for creating chunks these settings heavily influences the AI response 
const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 2000,
    separators: ['\n\n','\n',' ',''],
    chunkOverlap: 1000
});

const splitDocument = await splitter.splitDocuments(docs);

//###################
//##    Warning    ##---------- Saving Collection ------- process might take a while --------
//###################

const vectorStore = await Chroma.fromDocuments(splitDocument, ollamaEmbeddings, {
    collectionName: "webdev", // <------- collection name is needed for api. check : -> src/api/llm.js
    url: "http://localhost:8000", 
    collectionMetadata: {
        "hnsw:space": "cosine",
      },
});

//--------------------------------- Succes Check ------------------------------------------

const vectorStoreResponse = await vectorStore.similaritySearch("is in the silver package");

console.log("Printing docs after similarity search --> ",vectorStoreResponse);
