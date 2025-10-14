import { defineConfig } from 'vitest/config'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [ vue() ],
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
})