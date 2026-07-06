import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Any fetch to /api/... from the React app gets forwarded to Spring Boot.
      // This avoids CORS headaches in local development -- the browser thinks
      // it's talking to itself on port 5173, and Vite quietly relays it to 8080.
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
})
