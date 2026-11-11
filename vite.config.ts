import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  // Publicado em https://lynthz.github.io/portfolio/
  base: '/portfolio/',
  plugins: [react()],
  // O chunk do Three.js (carregado sob demanda) passa de 500 kB sem compressão; o inicial fica bem abaixo.
  build: { chunkSizeWarningLimit: 1100 },
});
