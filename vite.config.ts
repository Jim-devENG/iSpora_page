import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  root: './frontend', // Frontend source is now in frontend/
  publicDir: './frontend/public', // Public assets
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./frontend"),
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
    outDir: '../dist', // Build output goes to root dist/ (for Vercel)
    emptyOutDir: true,
    // Standard build configuration
    minify: 'terser',
    sourcemap: false, // Disable sourcemaps to prevent CSP violations
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Remove sourcemap references from built files
        sourcemap: false,
      }
    }
  },
  define: {
    // Remove development-only code
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development'),
  }
})
