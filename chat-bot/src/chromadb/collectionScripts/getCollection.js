import { ChromaClient } from "chromadb";

const client = new ChromaClient();
const collection = await client.getCollection({ name: "webdev" });

console.log(collection)