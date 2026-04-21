import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: ["typescript", "react", "import", "unicorn", "jsx-a11y"],
  categories: {
    correctness: "error",
    suspicious: "warn",
    pedantic: "warn",
    perf: "warn",
    style: "off",
  },
  rules: {
    "no-restricted-imports": [
      "error",
      {
        paths: [
          {
            name: "process",
            importNames: ["env"],
            message:
              "Use `import { env } from '~/env'` instead to ensure validated types.",
          },
          {
            name: "zod",
            message: "Use `import { z } from 'zod/v4'` instead to ensure v4.",
          },
        ],
      },
    ],
    "typescript/no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
    "typescript/consistent-type-imports": [
      "warn",
      { prefer: "type-imports", fixStyle: "separate-type-imports" },
    ],
    "typescript/no-misused-promises": [
      "error",
      { checksVoidReturn: { attributes: false } },
    ],
    "typescript/no-unnecessary-condition": [
      "error",
      { allowConstantLoopConditions: true },
    ],
    "typescript/no-non-null-assertion": "error",
    "typescript/no-explicit-any": "warn",
    "typescript/no-floating-promises": "off",
    "typescript/require-await": "off",
    "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
    "react/rules-of-hooks": "error",
    "react/exhaustive-deps": "warn",
    "react/react-in-jsx-scope": "off",
  },
  ignorePatterns: [
    "**/env.ts",
    "dist",
    "node_modules",
    ".git",
    ".cache",
    ".turbo",
    ".tanstack",
    "coverage",
  ],
  settings: {
    react: {
      version: "19",
    },
  },
});
