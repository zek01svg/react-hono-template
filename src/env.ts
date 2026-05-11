import type { Env } from "../server/env";

export const env: Env = {
  VITE_APP_URL: window.__env?.VITE_APP_URL ?? import.meta.env.VITE_APP_URL,
  VITE_SENTRY_DSN: window.__env?.VITE_SENTRY_DSN ?? import.meta.env.VITE_SENTRY_DSN,
  VITE_SENTRY_ORG: window.__env?.VITE_SENTRY_ORG ?? import.meta.env.VITE_SENTRY_ORG,
  VITE_SENTRY_PROJECT: window.__env?.VITE_SENTRY_PROJECT ?? import.meta.env.VITE_SENTRY_PROJECT,
};
