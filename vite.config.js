import { defineConfig } from "vite";
import { host , origin, port } from "./globalVars.mjs";
import react from "@vitejs/plugin-react";

export default defineConfig({

  server: {
    host,
    port,
    strictPort: true,
    proxy: {
      "/api": {
        target: origin, 
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  plugins: [react()],
});
