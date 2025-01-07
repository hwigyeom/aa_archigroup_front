import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  cacheDir: './.vite',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'login.html'),
      },
    },
  },
});
