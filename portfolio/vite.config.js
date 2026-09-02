import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const root = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  root,
  base: '/',
  publicDir: resolve(root, 'public'),
  plugins: [react()],
  appType: 'mpa',
  build: {
    outDir: resolve(root, '../dist-portfolio'),
    emptyOutDir: true,
    target: 'es2020',
    sourcemap: false,
    rollupOptions: {
      input: {
        portfolio: resolve(root, 'index.html'),
        resume: resolve(root, 'curriculo/index.html'),
      },
    },
  },
});
