import "server-only";
import { and, asc, desc, eq, lte } from "drizzle-orm";
import { getDb } from "@/lib/db";
import * as s from "@/lib/db/schema";
import { getDefaultContent } from "./defaults";
import type { CvSkillGroup, Profile, SiteContent } from "./types";

/** Contenu complet du site (base de données, ou contenu par défaut sans base). */
export async function getSiteContent(): Promise<SiteContent> {
  const db = await getDb();
  if (!db) return getDefaultContent();
  try {
    const [settingsRows, timeline, projects, services, skills] = await Promise.all([
      db.select().from(s.settings),
      db.select().from(s.timelineItems).orderBy(asc(s.timelineItems.sortOrder), asc(s.timelineItems.id)),
      db.select().from(s.projects).orderBy(asc(s.projects.sortOrder), asc(s.projects.id)),
      db.select().from(s.services).orderBy(asc(s.services.sortOrder), asc(s.services.id)),
      db.select().from(s.skills).orderBy(asc(s.skills.sortOrder), asc(s.skills.id)),
    ]);
    const defaults = getDefaultContent();
    const byKey = new Map(settingsRows.map((r) => [r.key, r.value]));
    const profile = { ...defaults.profile, ...((byKey.get("profile") as Profile | undefined) ?? {}) };
    const cvSkills = (byKey.get("cvSkills") as CvSkillGroup[] | undefined) ?? defaults.cvSkills;
    return { profile, timeline, projects, services, skills, cvSkills };
  } catch (err) {
    console.error("[content] lecture impossible, contenu par défaut utilisé :", err);
    return getDefaultContent();
  }
}

export async function getPublishedPosts(limit?: number): Promise<s.Post[]> {
  const db = await getDb();
  if (!db) return [];
  try {
    const q = db
      .select()
      .from(s.posts)
      .where(and(eq(s.posts.status, "published"), lte(s.posts.publishedAt, new Date())))
      .orderBy(desc(s.posts.publishedAt));
    return limit ? await q.limit(limit) : await q;
  } catch (err) {
    console.error("[content] articles indisponibles :", err);
    return [];
  }
}

export async function getPublishedPost(slug: string): Promise<s.Post | null> {
  const db = await getDb();
  if (!db) return null;
  const rows = await db
    .select()
    .from(s.posts)
    .where(and(eq(s.posts.slug, slug), eq(s.posts.status, "published"), lte(s.posts.publishedAt, new Date())))
    .limit(1);
  return rows[0] ?? null;
}
