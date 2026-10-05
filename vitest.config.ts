import { defineConfig } from 'vitest/config';

export default defineConfig({
  esbuild: { jsx: 'automatic' },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./react/test-setup.ts'],
    include: ['react/**/*.test.{ts,tsx}', 'tests/**/*.test.ts'],
  },
});
