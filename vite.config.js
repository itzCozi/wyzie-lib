import { defineConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      name: 'WyzieLib',
      fileName: (format) => `wyzie-lib.${format}.js`,
      formats: ['es', 'umd', 'cjs', 'iife']
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {}
      }
    }
  }
});