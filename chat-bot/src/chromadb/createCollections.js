import {OllamaEmbeddings} from "@langchain/community/embeddings/ollama"
import { Chroma } from "@langchain/community/vectorstores/chroma";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

//--------------------------- Document loader/splitter -------------------------------------

const loader = new TextLoader("D:/projects/ai-assistant/chat-bot/src/chromadb/peterpan.txt");

const docs = await loader.load();

// Creates a text splitter for creating chunks these settings heavily influences the AI response 
const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 300,
    separators: ['\n\n','\n',' ',''],
    chunkOverlap: 100
});

const splitDocument = await splitter.splitDocuments(docs);

//###################
//##    Warning    ##---------- Saving Collection ------- process might take a while --------
//###################

const ollamaEmbeddings = new OllamaEmbeddings({
    baseUrl:"http://127.0.0.1:11434",
    model:"mistral"
});

const vectorStore = await Chroma.fromDocuments(splitDocument, ollamaEmbeddings, {
    collectionName: "affectionate", // <------- collection name is needed for api. check : -> src/api/llm.js
    url: "http://localhost:8000", 
});

//--------------------------------- Succes Check ------------------------------------------

const vectorStoreResponse = await vectorStore.similaritySearch("is peter pan in this document", 1);

console.log("Printing docs after similarity search --> ",vectorStoreResponse);
