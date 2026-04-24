import { env } from "#client/env.ts";
import { createAuthClient } from "better-auth/client";

export const auth = createAuthClient({
  baseURL: env.VITE_APP_URL + "/api/auth",
});
