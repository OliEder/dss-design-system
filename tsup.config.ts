import { defineConfig } from 'tsup';

export default defineConfig({
  entry: { 'react/index': 'react/index.ts' },
  format: ['esm'],
  dts: true,
  clean: true,
  sourcemap: true,
  outDir: 'dist',
  tsconfig: 'react/tsconfig.json',
  esbuildOptions(options) {
    options.jsx = 'automatic';
  },
});
