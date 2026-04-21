import * as schema from "#server/database/index";
import { env } from "#server/env";
import { drizzle } from "drizzle-orm/postgres-js";

export const db = drizzle({
  connection: {
    url: env.DATABASE_URL,
  },
  schema,
});
