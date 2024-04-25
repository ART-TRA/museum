import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import liveReload from 'vite-plugin-live-reload';
import stylelint from 'vite-plugin-stylelint';

export default defineConfig({
  plugins: [
    react({ include: /\.(mdx|js|jsx|ts|tsx|glsl)$/ }),
    glsl(),
    eslint(),
    liveReload('my-file', { alwaysReload: true }),
  ],
  server: {
    host: true,
    port: 3000,
    watch: {
      usePolling: true,
    },
  },
  resolve: {
    alias: {
      src: '/src',
    },
  },
  optimizeDeps: {
    exclude: ['@monogrid/gainmap-js/libultrahdr'],
  },
});
