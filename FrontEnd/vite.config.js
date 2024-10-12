import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  base: './', // Base URL for production builds

  server: {
    port: 5173, // Change this to 5173 or another available port
    open: true, // Automatically open the browser

    proxy: {
      '/api': {
        target: 'http://localhost:8000', 
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },

    // Optional: Enable HMR
    hmr: {
      protocol: 'ws',
      host: 'localhost',
    },
  },
});
