import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      coverage: {
        include: ['src/**/*.{ts,tsx}'],
        exclude: ['src/**/*.spec.{ts,tsx}'],
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
