import { Pool } from "pg";
import { env } from "../config/env";

export const db = new Pool({
  connectionString: env.DATABASE_URL
});

db.on("connect", () => {
  console.log("PostgreSQL connected");
});

db.on("error", (err) => {
  console.error("PostgreSQL error", err);
});
