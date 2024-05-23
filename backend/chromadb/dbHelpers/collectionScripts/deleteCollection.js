import { ChromaClient } from "chromadb";
import { collectionName } from "../../../../globalVars.mjs";

const client = new ChromaClient();

await client.deleteCollection({ name: collectionName });

  