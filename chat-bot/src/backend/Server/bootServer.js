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

const server = http.createServer((req, res) => {
  cors(corsOptions)(req, res, () => {
    const { pathname, query } = parse(req.url, true);

    console.log(query);

    if (pathname === "/api/generate" && req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", async () => {
        try {
          const client = new ChromaClient();
          const ollama = new Ollama({ host: "0.0.0.0" });
          const collection = await client.getCollection({ name: "webdev" });

          const { prompt } = JSON.parse(body);

          const response = await ollama.embeddings({
            prompt: prompt,
            model: "mistral",
          });

          const results = await collection.query({
            queryEmbeddings: [response.embedding],
            nResults: 1,
          });

          const generatedOutput = await ollama.generate({
            model: "mistral",
            prompt: `Using this data: ${results.documents}. Respond to this prompt: ${prompt}`,
          });

          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ response: generatedOutput.response }));
        } catch (error) {
          console.error("Error processing request:", error);
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Internal Server Error");
        }
      });
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
    }
  });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
