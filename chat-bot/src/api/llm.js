import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama";
import { Ollama } from "@langchain/community/llms/ollama";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { Chroma } from "@langchain/community/vectorstores/chroma";

function combineDocuments(docs) {
  return docs.map((doc) => doc.pageContent).join("\n\n");
}
//------------------------------------- Model & Embbeding ----------------------------------

const model = new Ollama({
  baseUrl: "http://127.0.0.1:11434",
  model: "mistral",
  temperature: 1,
  maxTokens: 50,
  verbose: true,
});

const ollamaEmbeddings = new OllamaEmbeddings({
  baseUrl: "http://127.0.0.1:11434",
  model: "mistral",
});

//------------------------------------- Chroma DB Vector ----------------------------------

const vectorStore = await Chroma.fromExistingCollection(ollamaEmbeddings, {
  collectionName: "affectionate_hellman",
  url: "http://localhost:8000",
});

const chromaRetriever = vectorStore.asRetriever();

//---------------------------------- Prompt Templates --------------------------------------

const prompt = ChatPromptTemplate.fromTemplate(`
anweser the user's questios ,only.
Context : {context} 
Question : {input}
`);

const dbPrompt = PromptTemplate.fromTemplate(`
For following user question convert it into a standalone question
{userQuestion}`);

//--------------------------------- db/ai chain----------------------------------------------

const chromaDbChain = dbPrompt
  .pipe(model)
  .pipe(new StringOutputParser())
  .pipe(chromaRetriever);

const aiChain = prompt.pipe(model);

//###################
//## retrieve data ##-------------------------------------------------------------------------
//###################

export const llmSubmit = async (event, prompt, setResponse) => {
  event.preventDefault();

  const documents = await chromaDbChain.invoke({
    userQuestion: prompt,
  });

  const combinedDocs = combineDocuments(documents);

  console.log("combinedDocs " + combinedDocs);

  const response = await aiChain.invoke({
    input: prompt,
    context: combinedDocs,
  });

  setResponse(response);
  console.log(response);
};
