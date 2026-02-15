import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'สั่งของใช้ในบ้าน',
        short_name: 'ของใช้',
        description: 'สั่งของใช้ในบ้าน',
        start_url: '/',
        display: 'standalone',
        background_color: '#FAF6F1',
        theme_color: '#3E2723',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,jpg,webp,svg}'],
      },
    }),
  ],
})
