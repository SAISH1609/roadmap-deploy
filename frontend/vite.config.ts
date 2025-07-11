import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path' // Import the 'path' module

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // Configure the '@' alias to point to your 'src' directory
      // This allows you to use imports like '@/components/Button'
      // instead of '../../components/Button'
      '@': path.resolve(__dirname, './src'),
    },
  },
})