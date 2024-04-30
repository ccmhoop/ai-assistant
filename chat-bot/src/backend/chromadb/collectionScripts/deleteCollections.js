import { ChromaClient } from "chromadb";

const client = new ChromaClient();

await client.deleteCollection({ name: "webdev" });
