import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [vue()],
  publicDir: resolve(import.meta.dirname, '../public'),
  resolve: {
    alias: {
      '#': resolve(import.meta.dirname, '../public'),
      '@': resolve(import.meta.dirname, '../src'),
      '@components': resolve(import.meta.dirname, '../src/components'),
      '@types': resolve(import.meta.dirname, '../src/types'),
      '@utils': resolve(import.meta.dirname, '../src/utils'),
      '@constants': resolve(import.meta.dirname, '../src/constants'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use '@/styles/general' as *;`,
      },
    },
    postcss: {
      plugins: [autoprefixer()],
    },
  },
});
