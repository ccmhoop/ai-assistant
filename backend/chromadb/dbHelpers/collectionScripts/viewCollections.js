import { ChromaClient } from "chromadb";

const client = new ChromaClient();

console.log(await client.listCollections());