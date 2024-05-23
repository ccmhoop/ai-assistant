import http from "http";
import { Ollama } from "ollama";
import { ChromaClient } from "chromadb";
import { parse } from "url";
import cors from "cors";
import aiPipeline from "./ai/aiPipeLine.mjs";
import { portListener, origin, host, collectionName } from "../globalVars.mjs";

const client = new ChromaClient();
const ollama = new Ollama({ host });

//----------------------------------------------------------------------------------
const collection = await client.getCollection({ name: collectionName });
const corsOptions = {
  origin,
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};
//----------------------------------------------------------------------------------
const getRequestBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      resolve(body);
    });
    req.on("error", (err) => {
      reject(err);
    });
  });
};
//---------------------------------------------------------------------------------
const server = http.createServer(async (req, res) => {
  cors(corsOptions)(req, res, async () => {
    const { pathname } = parse(req.url, true);

    if (pathname === "/api/generate" && req.method === "POST") {
      try {
        res.setHeader("Content-Type", "application/json");

        const { prompt } = JSON.parse(await getRequestBody(req));
        
        const response = await aiPipeline(ollama, prompt, collection);

        res.end(JSON.stringify({ response }));
      } catch (error) {
        console.error("Error processing request:", error);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
      }
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
    }
  });
});
//----------------------------------------------------------------------------------
server.listen(portListener, () => {
  console.log(`Server is running on port ${portListener}`);
});

