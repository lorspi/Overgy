import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { contentPlugin } from "./vite-plugin-content";

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths(), contentPlugin()],
  server: {
    port: 8080,
    allowedHosts: ["test.lorspi.com"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          tebex: ["@tebexio/tebex.js"],
        },
      },
    },
  },
});
