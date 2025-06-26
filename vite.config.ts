import { vercelPreset } from "@vercel/react-router/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig(() => ({
  server: {
    port: 4200,
    host: "localhost",
  },
  base: "/",
  preview: {
    port: 4300,
    host: "localhost",
  },
  plugins: [react()],
  presets: [vercelPreset()],
  build: {
    outDir: "./dist",
    emptyOutDir: true,
    reportCompressedSize: true,
  },
}));
