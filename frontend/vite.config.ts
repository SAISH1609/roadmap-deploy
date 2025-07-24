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
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  preview: {
    host: '0.0.0.0',
    port: parseInt(process.env.PORT || '5173'),
    // Allow Railway hosts and any other hosts in production
    allowedHosts: [
      'frontend-production-2660.up.railway.app',
      '*.up.railway.app',
      'localhost',
      '127.0.0.1'
    ],
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    // Handle assets with more reliable settings
    assetsDir: '',
    rollupOptions: {
      output: {
        // Place static files at the root level
        assetFileNames: (assetInfo) => {
          // Keep favicon.ico at the root level
          if (assetInfo.name === 'favicon.ico') {
            return '[name].[ext]';
          }
          return 'assets/[name]-[hash].[ext]';
        }
      }
    },
    // Copy the favicon.ico to the root of the dist directory
    emptyOutDir: true,
  },
})