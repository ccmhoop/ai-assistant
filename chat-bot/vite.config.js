import { defineConfig } from "vite";
// import dns from "node:dns";
import react from "@vitejs/plugin-react";

// dns.setDefaultResultOrder("verbatim");
// https://vitejs.dev/config/
export default defineConfig({
  // vite.config.js
  server: {
    host: "0.0.0.0",
    port: 8000,
    strictPort: true,
    proxy: {
      "/api": {
        target: "http://localhost:8000", // ChromaDB URL
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  plugins: [react()],
});
