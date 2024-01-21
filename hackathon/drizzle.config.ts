import type { Config } from "drizzle-kit";
export default {
  schema: "./server/db.ts",
  out: "./drizzle/migrations/",
} satisfies Config;