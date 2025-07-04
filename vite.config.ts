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
    minify: true,
    target: "es2022",
    outDir: "./dist",
    emptyOutDir: true,
    reportCompressedSize: true,
    rollupOptions: {
      output: {
        entryFileNames: "assets/[name].js",
        chunkFileNames: "assets/[name].js",
        assetFileNames: "assets/[name][extname]",
        manualChunks(id: string) {
          if (id.includes("node_modules")) {
            const parts = id.split("node_modules/")[1].split("/");
            const pkgName = parts[0].startsWith("@")
              ? `${parts[0]}/${parts[1]}`
              : parts[0];
            return `vendor/${pkgName}`;
          }
        },
      },
    },
  },
}));
