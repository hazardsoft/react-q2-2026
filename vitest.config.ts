import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/__tests__/setup.ts'],
      mockReset: true,
      coverage: {
        include: ['src/**/*.{ts,tsx}'],
        exclude: ['src/**/*.spec.{ts,tsx}', 'src/__tests__/*.*'],
        thresholds: {
          statements: 80,
          branches: 50,
          functions: 50,
          lines: 50,
        },
      },
    },
  })
);
