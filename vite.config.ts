import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "./",
    },
  },
  server: {
    port: 5174,
    strictPort: true,
  },
  preview: {
    port: 5174,
    strictPort: true,
  },
  build: {
    // Standard build configuration
    minify: 'terser',
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
  },
  define: {
    // Remove development-only code
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development'),
  }
})
