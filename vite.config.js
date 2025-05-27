import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { compression } from 'vite-plugin-compression2';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    compression({
      algorithm: 'gzip',
      exclude: [/\.(br)$/, /\.(gz)$/],
    }),
    compression({
      algorithm: 'brotliCompress',
      exclude: [/\.(br)$/, /\.(gz)$/],
    }),
    visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  build: {
    // Enable code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          antd: ['antd'],
          forms: [
            './src/components/forms/LLCForm.tsx',
            './src/components/forms/CorporationForm.tsx',
            './src/components/forms/NonprofitForm.tsx',
            './src/components/forms/DBAForm.tsx',
          ],
        },
      },
    },
    // Enable source maps for better debugging
    sourcemap: true,
    // Optimize chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  // Enable server-side rendering (SSR) support
  ssr: {
    noExternal: ['react-helmet-async'],
  },
  // Optimize development server
  server: {
    port: 3000,
    open: true,
    hmr: {
      overlay: true,
    },
  },
  // Optimize CSS
  css: {
    devSourcemap: true,
    modules: {
      localsConvention: 'camelCase',
    },
  },
  // Optimize assets
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.svg', '**/*.gif'],
  // Enable caching
  cacheDir: '.vite_cache',
}); 