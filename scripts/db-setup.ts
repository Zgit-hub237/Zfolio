/**
 * Prépare la base Neon de production : crée les tables puis la remplit avec le contenu actuel du site.
 * Usage : npm run db:setup   (DATABASE_URL doit être dans .env.local, ex. via `vercel env pull .env.local`)
 */
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { migrate } from "drizzle-orm/neon-http/migrator";
import * as schema from "../src/lib/db/schema";
import { seedIfEmpty } from "../src/lib/db/seed";
import { loadEnv } from "./lib";

async function main() {
  loadEnv();
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL absent de .env.local. Lance d'abord : vercel env pull .env.local");

  const db = drizzle(neon(url), { schema });
  console.log("→ Création / mise à jour des tables…");
  await migrate(db, { migrationsFolder: "drizzle" });
  console.log("→ Remplissage initial…");
  const seeded = await seedIfEmpty(db);
  console.log(seeded ? "✔ Base remplie avec le contenu actuel du site." : "✔ Base déjà initialisée : contenu conservé.");
}

main().catch((err) => {
  console.error(`\n✖ ${err.message}\n`);
  process.exit(1);
});
