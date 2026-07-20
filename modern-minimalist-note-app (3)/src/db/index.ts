import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required");
}

const globalForDb = globalThis as typeof globalThis & {
  __notesAppPool?: Pool;
};

// Determine if we're connecting to a cloud DB that requires SSL
const needsSsl =
  databaseUrl.includes("neon.tech") ||
  databaseUrl.includes("supabase") ||
  databaseUrl.includes("railway") ||
  databaseUrl.includes("render.com") ||
  databaseUrl.includes("vercel-storage") ||
  process.env.NODE_ENV === "production";

export const pool =
  globalForDb.__notesAppPool ??
  new Pool({
    connectionString: databaseUrl,
    max: needsSsl ? 5 : 10,
    ssl: needsSsl ? { rejectUnauthorized: false } : false,
    idleTimeoutMillis: 20000,
    connectionTimeoutMillis: 10000,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.__notesAppPool = pool;
}

export const db = drizzle(pool);
