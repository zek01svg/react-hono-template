import { db } from "#server/drizzle/db.ts";
import {
  account as accountTable,
  user as userTable,
} from "#server/drizzle/schema/auth.ts";
import { hashPassword } from "better-auth/crypto";

await db.transaction(async (tx) => {
  // Admin user
  await tx
    .insert(userTable)
    .values({
      id: "admin",
      name: "Admin",
      email: "admin@test.com",
    })
    .onConflictDoNothing();
  await tx
    .insert(accountTable)
    .values({
      id: "admin",
      accountId: "admin",
      userId: "admin",
      providerId: "credential",
      password: await hashPassword("password"),
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .onConflictDoNothing();
});

console.log("Database seeded successfully!");

process.exit(0);
