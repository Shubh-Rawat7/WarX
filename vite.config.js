import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,       // default Vite port, you can change it
    open: true,       // opens browser automatically
  },
  resolve: {
    alias: {
      "@": "/src",    // optional: allows importing using "@/components/Player"
    },
  },
});
