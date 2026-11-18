import "server-only";
import path from "node:path";
import type { NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import { seedIfEmpty } from "./seed";

export type DB = NeonHttpDatabase<typeof schema>;

/**
 * Base de données :
 * - production : Postgres Neon via DATABASE_URL ;
 * - développement local sans DATABASE_URL : Postgres embarqué (PGlite) dans .data/pglite.
 * Sans l'un ni l'autre (ex. build Vercel sans base), renvoie null et le site
 * affiche le contenu par défaut, en lecture seule.
 */
// Partagé via globalThis : en dev, Next charge ce module plusieurs fois (HMR, bundles par route)
// et deux instances PGlite sur le même dossier pourraient corrompre la base locale.
const g = globalThis as unknown as { __zfolioDb?: Promise<DB | null> | null };

export function isDbConfigured() {
  return Boolean(process.env.DATABASE_URL) || process.env.NODE_ENV !== "production" || Boolean(process.env.PGLITE_DIR);
}

export function getDb(): Promise<DB | null> {
  if (!g.__zfolioDb) {
    g.__zfolioDb = createDb().catch((err) => {
      console.error("[db] connexion impossible :", err);
      g.__zfolioDb = null;
      return null;
    });
  }
  return g.__zfolioDb;
}

async function createDb(): Promise<DB | null> {
  const url = process.env.DATABASE_URL;
  if (url) {
    const { neon } = await import("@neondatabase/serverless");
    const { drizzle } = await import("drizzle-orm/neon-http");
    return drizzle(neon(url), { schema });
  }

  if (!isDbConfigured()) return null;

  // Développement local : Postgres embarqué, migrations + données initiales automatiques
  const { PGlite } = await import("@electric-sql/pglite");
  const { drizzle } = await import("drizzle-orm/pglite");
  const { migrate } = await import("drizzle-orm/pglite/migrator");
  const dir = process.env.PGLITE_DIR || path.join(process.cwd(), ".data", "pglite");
  const { mkdir } = await import("node:fs/promises");
  await mkdir(dir, { recursive: true });
  const client = new PGlite(dir);
  const db = drizzle(client, { schema });
  await migrate(db, { migrationsFolder: path.join(process.cwd(), "drizzle") });
  const typed = db as unknown as DB;
  await seedIfEmpty(typed);
  return typed;
}
