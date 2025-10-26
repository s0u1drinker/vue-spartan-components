/// <reference types="vitest/config" />
import { defineConfig } from 'vitest/config';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
const dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, 'src'),
      '@components': resolve(import.meta.dirname, 'src/components'),
      '@types': resolve(import.meta.dirname, 'src/types'),
      '@utils': resolve(import.meta.dirname, 'src/utils'),
      '@constants': resolve(import.meta.dirname, 'src/constants'),
    },
  },
  test: {
    // Имитация DOM-окружения (как в браузере).
    environment: 'jsdom',
    // Можно использовать describe, it, expect без импорта.
    globals: true,
    // Файл, который выполнится перед каждым тестом.
    setupFiles: ['./tests/setup.ts'],
  },
});
