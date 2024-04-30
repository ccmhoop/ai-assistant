import { ChromaClient } from "chromadb";

const client = new ChromaClient();

await client.createCollection({ name: "webdev" });
