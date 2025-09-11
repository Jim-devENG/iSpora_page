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
    // Security optimizations
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false, // Keep console.log to avoid security warnings
        drop_debugger: true, // Remove debugger statements
        pure_funcs: [], // Don't remove console functions
      },
      mangle: {
        // Obfuscate variable names
        toplevel: true,
        properties: {
          regex: /^_/ // Mangle properties starting with underscore
        }
      }
    },
    rollupOptions: {
      output: {
        // Obfuscate chunk names
        chunkFileNames: 'assets/[hash].js',
        entryFileNames: 'assets/[hash].js',
        assetFileNames: 'assets/[hash].[ext]',
        // Split chunks for better obfuscation
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react', 'motion/react']
        }
      }
    },
    // Source map configuration for production
    sourcemap: false, // Disable source maps in production
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
  },
  define: {
    // Remove development-only code
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development'),
  }
})
