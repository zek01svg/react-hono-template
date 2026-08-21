import { defineConfig, defineProject, mergeConfig } from "vitest/config";

import path from "node:path";

export const baseConfig = defineConfig({
  resolve: {
    alias: {
      // shadcn-generated components import via root-relative "src/..." paths
      src: path.resolve(import.meta.dirname, "src"),
    },
  },
  test: {
    coverage: {
      provider: "istanbul" as const,
      reporter: [
        [
          "json",
          {
            file: `../coverage.json`,
          },
        ],
      ] as const,
      enabled: true,
    },
  },
});

const uiConfig = mergeConfig(
  baseConfig,
  defineProject({
    test: {
      environment: "jsdom",
    },
  })
);

export default uiConfig;
