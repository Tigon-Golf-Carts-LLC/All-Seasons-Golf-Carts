import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// `BASE_PATH` lets the same build target either a root deployment
// (custom domain / user page / Cloudflare Pages) or a GitHub Pages project
// page served from `https://<user>.github.io/<repo>/`.
const rawBase = process.env.BASE_PATH ?? "/";
const base = rawBase === "/" ? "/" : `/${rawBase.replace(/^\/+|\/+$/g, "")}/`;

export default defineConfig({
  base,
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
    chunkSizeWarningLimit: 800,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
