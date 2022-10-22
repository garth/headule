/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    environment: 'node',
    threads: false,
  },
  esbuild: {
    platform: 'node',
  },
})
