import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import compression from 'vite-plugin-compression'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),compression()],
  server:{
    proxy:{
      "/api":{
        target:"http://localhost:5000/"
      }
    }
  },
  build:{
    chunkSizeWarningLimit: 2000
  }
})
