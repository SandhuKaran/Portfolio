import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // The rapier chunk is ~3 MB of inlined wasm and always will be. It's loaded
    // lazily and never blocks first paint, so the size warning is just noise.
    chunkSizeWarningLimit: 3500,
    // three and the rapier wasm bindings dwarf everything else. Splitting them
    // into their own chunks keeps them cached across deploys of the site copy.
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/three")) return "three";
          if (id.includes("rapier")) return "rapier";
          return undefined;
        },
      },
    },
  },
});
