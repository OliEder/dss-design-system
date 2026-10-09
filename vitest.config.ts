import { defineConfig } from 'vitest/config';

export default defineConfig({
  esbuild: { jsx: 'automatic' },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./react/test-setup.ts'],
    include: ['react/**/*.test.{ts,tsx}', 'tests/**/*.test.ts', 'tests/**/*.test.tsx'],
    // axe-Läufe und getByRole sind unter Last (Spotlight, CI) langsam; 5 s Standard erzeugt Flakes.
    testTimeout: 20000,
  },
});
