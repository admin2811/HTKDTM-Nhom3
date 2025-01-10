import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://ec2-3-106-58-241.ap-southeast-2.compute.amazonaws.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  define: {
    'process.env': {}
  }
})
