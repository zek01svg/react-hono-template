import { sentryVitePlugin } from "@sentry/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import tanstackRouter from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

import path from "path";

// https://vite.dev/config/

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const sentryAuthToken = env.SENTRY_AUTH_TOKEN?.trim();
  const sentryOrg = env.VITE_SENTRY_ORG?.trim();
  const sentryProject = env.VITE_SENTRY_PROJECT?.trim();
  const shouldUploadSourcemaps =
    mode === "production" && Boolean(sentryAuthToken && sentryOrg && sentryProject);

  const clientEnv = {
    VITE_APP_URL: env.VITE_APP_URL,
    VITE_SENTRY_DSN: env.VITE_SENTRY_DSN,
    VITE_SENTRY_ORG: env.VITE_SENTRY_ORG,
    VITE_SENTRY_PROJECT: env.VITE_SENTRY_PROJECT,
  };

  return {
    plugins: [
      tanstackRouter({
        target: "react",
      }),
      react(),
      tailwindcss(),
      ...(shouldUploadSourcemaps
        ? [
            sentryVitePlugin({
              authToken: sentryAuthToken,
              org: sentryOrg,
              project: sentryProject,
              telemetry: false,
              sourcemaps: {
                assets: ["./dist/**/*"],
              },
            }),
          ]
        : []),
    ],
    resolve: {
      alias: {
        "#client": path.resolve(__dirname, "./src"),
        "#server": path.resolve(__dirname, "./server"),
        "#shared": path.resolve(__dirname, "./shared"),
      },
    },
    server: {
      port: 4000,
      open: false,
      proxy: {
        "/api": {
          target: "http://localhost:4001",
          changeOrigin: true,
        },
      },
    },
    define: {
      process: {
        env: clientEnv,
      },
    },
    build: {
      outDir: "dist/static",
      sourcemap: true,
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, "index.html"),
        },
      },
    },
  };
});
