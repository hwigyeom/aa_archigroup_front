import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  cacheDir: './.vite',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'login.html'),
        error400: resolve(__dirname, '400.html'),
        error404: resolve(__dirname, '404.html'),
        error500: resolve(__dirname, '500.html'),
        error: resolve(__dirname, 'error.html'),
        layout01: resolve(__dirname, 'view/pi/layout01.html'),
        layout02: resolve(__dirname, 'view/pi/layout02.html'),
        layout03: resolve(__dirname, 'view/pi/layout03.html'),
        popup01: resolve(__dirname, 'view/pi/popup01.html'),
        popup02: resolve(__dirname, 'view/pi/popup02.html'),
      },
    },
  },
});
