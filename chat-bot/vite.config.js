import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
 
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
