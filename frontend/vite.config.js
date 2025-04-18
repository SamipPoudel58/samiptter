import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import pluginRewriteAll from "vite-plugin-rewrite-all";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    pluginRewriteAll(),
    svgr(),
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Samiptter",
        short_name: "Samiptter",
        start_url: "/",
        display: "standalone",
        background_color: "#f9f9f9",
        theme_color: "#f7faff",
        description: "The ultimate social media site of your dreams.",
        icons: [
          {
            src: "/icons/android-chrome-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/icons/android-chrome-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/icons/android-chrome-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/icons/maskable_icon_proper.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
  server: {
    host: true,
    port: 3000,
  },
});
