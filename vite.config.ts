import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import svgLoader from 'vite-svg-loader';
import { configDefaults } from 'vitest/config';

// https://vite.dev/config/
export default defineConfig({
  base: '/Ludopedia',
  plugins: [
    vue(),
    vueDevTools(),
    svgLoader(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/tests/**/*.test.{ts,js}'],
    exclude: [...configDefaults.exclude, 'e2e/**'],
    coverage: {
      provider: 'istanbul',
      reportsDirectory: 'coverage',
      reporter: ['text', 'json', 'html'],
    },
  },
  server: {
    proxy: {
      '/igdb-api': {
        target: 'https://ludopediaproxy.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/igdb-api/, ''),
      },
    },
  }

});
