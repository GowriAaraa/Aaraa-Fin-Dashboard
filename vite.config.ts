import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Polyfill process.env for standard Node-style env var usage
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || '')
  }
})