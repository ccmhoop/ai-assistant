import { ChromaClient } from "chromadb";

const client = new ChromaClient()

const collectionList = await client.listCollections();

collectionList.forEach(item => {
    client.deleteCollection({ name: item.name })
});
