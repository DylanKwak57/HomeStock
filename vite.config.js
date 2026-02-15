import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/HomeStock/',
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'สั่งของใช้ในบ้าน',
        short_name: 'ของใช้',
        description: 'สั่งของใช้ในบ้าน',
        start_url: '/HomeStock/',
        display: 'standalone',
        background_color: '#f5f5f5',
        theme_color: '#1565c0',
        icons: [
          { src: '/HomeStock/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/HomeStock/icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,jpg,webp,svg}'],
      },
    }),
  ],
})
