import http from "http";
import { Ollama } from "ollama";
import { ChromaClient } from "chromadb";
import { parse } from "url";
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8000",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};

const client = new ChromaClient();
const ollama = new Ollama({ host: "0.0.0.0" });

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

const generateResponse = async (prompt, embedding) => {
  const collection = await client.getCollection({ name: "webdev" });
  const results = await collection.query({
    queryEmbeddings: [embedding],
    nResults: 1,
  });
  const generatedOutput = await ollama.generate({
    model: "mistral",
    prompt: `Using this data: ${results.documents}. Respond to this prompt: ${prompt}`,
  });
  return generatedOutput.response;
};

const server = http.createServer(async (req, res) => {
  cors(corsOptions)(req, res, async () => {
    const { pathname } = parse(req.url, true);
    if (pathname === "/api/generate" && req.method === "POST") {
      try {
        const body = await getRequestBody(req);
        const { prompt } = JSON.parse(body);
        const response = await ollama.embeddings({
          prompt: prompt,
          model: "mistral",
        });
        const generatedResponse = await generateResponse(
          prompt,
          response.embedding
        );
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ response: generatedResponse }));
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

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});