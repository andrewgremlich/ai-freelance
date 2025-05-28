/// <reference types='vitest' />
import { defineConfig } from "vite";
import { vercelPreset } from "@vercel/react-router/vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(() => ({
	root: __dirname,
	cacheDir: "../../node_modules/.vite/apps/ai-freelance-dev",
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
