import { sql } from "drizzle-orm";
import type { NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import { getDefaultContent } from "@/lib/content/defaults";

type AnyDb = NeonHttpDatabase<typeof schema>;

/** Remplit la base avec le contenu actuel du site si elle est vide. */
export async function seedIfEmpty(db: AnyDb) {
  const existing = await db.select({ key: schema.settings.key }).from(schema.settings).limit(1);
  if (existing.length > 0) return false;

  const c = getDefaultContent();
  // L'identifiant est généré par la base
  const strip = <T extends { id: number }>(rows: T[]) =>
    rows.map((row) => {
      const rest: Partial<T> = { ...row };
      delete rest.id;
      return rest as Omit<T, "id">;
    });

  await db.insert(schema.timelineItems).values(strip(c.timeline));
  await db.insert(schema.projects).values(strip(c.projects));
  await db.insert(schema.services).values(strip(c.services));
  await db.insert(schema.skills).values(strip(c.skills));
  await db.insert(schema.settings).values([
    { key: "cvSkills", value: c.cvSkills },
    // "profile" en dernier : sa présence marque la base comme initialisée
    { key: "profile", value: c.profile },
  ]);

  await db.insert(schema.posts).values({
    slug: "bienvenue-sur-mon-blog",
    lang: "fr",
    title: "Bienvenue sur mon blog",
    excerpt: "Premier article : ce que vous trouverez ici, entre cybersécurité, développement et retours d'expérience.",
    content:
      "## Pourquoi ce blog ?\n\nJ'y partagerai mes **notes de veille**, mes **write-ups** de labs de sécurité et des retours d'expérience sur mes projets de développement.\n\n- Analyse de vulnérabilités et pentest en laboratoire\n- Développement sécurisé (web, mobile, API)\n- Ce que j'apprends en MSc Cybersecurity Management à l'ECE Paris\n\nÀ très vite !",
    tags: ["Annonce"],
    status: "published",
    publishedAt: sql`now()` as unknown as Date,
  });
  return true;
}
