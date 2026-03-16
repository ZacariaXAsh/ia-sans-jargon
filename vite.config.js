import path from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        root: path.resolve(__dirname, 'index.html'),
        fr: path.resolve(__dirname, 'fr/index.html'),
        en: path.resolve(__dirname, 'en/index.html'),
      },
    },
  },
});
