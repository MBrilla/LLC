import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // Enable code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
    // Enable source maps for better debugging
    sourcemap: true,
    // Optimize chunk size warning limit
    chunkSizeWarningLimit: 1000,
  },
  // Enable server-side rendering (SSR) support
  ssr: {
    noExternal: ['react-helmet-async'],
  },
  // Optimize development server
  server: {
    port: 3000,
    open: true,
  },
}); 