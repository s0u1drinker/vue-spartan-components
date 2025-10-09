import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    // Имитация DOM-окружения (как в браузере).
    environment: 'jsdom',
    // Можно использовать describe, it, expect без импорта.
    globals: true,
    // Файл, который выполнится перед каждым тестом.
    setupFiles: ['./tests/setup.ts'],
  },
})