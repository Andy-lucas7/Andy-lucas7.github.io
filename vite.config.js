import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Garante que as rotas de assets carreguem na raiz
  server: {
    port: 3000,
    open: false
  },
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        // Bibliotecas em chunks próprios: mudar o conteúdo do site não invalida o cache delas
        manualChunks: {
          react: ['react', 'react-dom'],
          motion: ['framer-motion']
        }
      }
    }
  }
});
