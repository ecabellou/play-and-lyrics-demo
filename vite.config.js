import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg', 'logo.png'],
      manifest: {
        name: 'Play & Lyrics',
        short_name: 'PlayLyrics',
        description: 'Synchronize lyrics with manual scrolling',
        theme_color: '#000000',
        background_color: '#000000',
        display: 'standalone',
        icons: [
          {
            src: 'play-and-lyrics-logo.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'play-and-lyrics-logo.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  build: {
    target: 'es2015', // Support for older devices
    cssTarget: 'chrome61',
  }
})
