import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import pluginRewriteAll from 'vite-plugin-rewrite-all';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    pluginRewriteAll(),
    svgr(),
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Samiptter',
        short_name: 'Samiptter',
        start_url: '/',
        display: 'standalone',
        background_color: '#f9f9f9',
        theme_color: '#818cf8',
        description: 'The ultimate social media site of your dreams.',
        splash_screen: {
          full: '/images/splash-screen.png',
        },
        icons: [
          {
            src: 'icons/icon-48.png',
            sizes: '48x48',
            type: 'image/png',
          },
          {
            src: 'icons/icon-72.png',
            sizes: '72x72',
            type: 'image/png',
          },
          {
            src: 'icons/icon-96.png',
            sizes: '96x96',
            type: 'image/png',
          },
          {
            src: 'icons/icon-128.png',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: 'icons/icon-144.png',
            sizes: '144x144',
            type: 'image/png',
          },
          {
            src: 'icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/icon-256.png',
            sizes: '256x256',
            type: 'image/png',
          },
          {
            src: 'icons/icon-384.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'icons/icon-1024.png',
            sizes: '1024x1024',
            type: 'image/png',
          },
          {
            src: 'icons/maskable-icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: 'icons/maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
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
