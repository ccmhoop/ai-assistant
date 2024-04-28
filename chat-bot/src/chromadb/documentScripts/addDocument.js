import { ChromaClient } from "chromadb";
import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { TextLoader } from "langchain/document_loaders/fs/text";

//fix embeding check chromaDB 422 Error

const ollamaEmbeddings = new OllamaEmbeddings({
    baseUrl:"http://127.0.0.1:11434",
    model:"mistral"
});


const client = new ChromaClient();

const loader = new TextLoader("D:/projects/ai-assistant/chat-bot/src/chromadb/webdev.txt");

const documents = await loader.load();

// console.log(documentsArray)
// Creates a text splitter for creating chunks these settings heavily influences the AI response 
const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 50,
    separators: ['\n\n','\n',' ',''],
  });
  
const document = await textSplitter.splitDocuments(documents);

const collection = await client.getCollection({ name: "affectionate" });


await collection.add({
    documents : ["student_info", "club_info", "university_info"],
    metadatas : [{"source": "student info"},{"source": "club info"},{'source':'university info'}],
    ids : ["id1", "id2", "id3"]
})