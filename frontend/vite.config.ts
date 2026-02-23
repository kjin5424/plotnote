import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      assets: path.resolve(__dirname, "./src/assets"),
      components: path.resolve(__dirname, "./src/components"),
      contexts: path.resolve(__dirname, "./src/contexts"),
      hooks: path.resolve(__dirname, "./src/hooks"),
      services: path.resolve(__dirname, "./src/services"),
      types: path.resolve(__dirname, "./src/types"),
      utils: path.resolve(__dirname, "./src/utils"),
      Setting: path.resolve(__dirname, "./src/Setting"),
    },
  },
});
