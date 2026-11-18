import "server-only";
import { and, count, eq, gte, lt } from "drizzle-orm";
import { headers } from "next/headers";
import { getDb } from "@/lib/db";
import { rateEvents } from "@/lib/db/schema";

const memory = new Map<string, number[]>();

export async function clientIp(): Promise<string> {
  const h = await headers();
  return (h.get("x-real-ip") || h.get("x-forwarded-for")?.split(",")[0] || "unknown").trim();
}

/** Nombre d'événements `action` pour `key` sur la fenêtre donnée. */
export async function countEvents(action: string, key: string, windowMs: number): Promise<number> {
  const since = new Date(Date.now() - windowMs);
  const db = await getDb();
  if (db) {
    const rows = await db
      .select({ n: count() })
      .from(rateEvents)
      .where(and(eq(rateEvents.action, action), eq(rateEvents.key, key), gte(rateEvents.createdAt, since)));
    return Number(rows[0]?.n ?? 0);
  }
  const list = (memory.get(`${action}:${key}`) ?? []).filter((t) => t >= since.getTime());
  memory.set(`${action}:${key}`, list);
  return list.length;
}

export async function recordEvent(action: string, key: string) {
  const db = await getDb();
  if (db) {
    await db.insert(rateEvents).values({ action, key });
    // Nettoyage opportuniste des événements de plus de 2 jours
    if (Math.random() < 0.05) {
      await db.delete(rateEvents).where(lt(rateEvents.createdAt, new Date(Date.now() - 2 * 86_400_000)));
    }
    return;
  }
  const k = `${action}:${key}`;
  memory.set(k, [...(memory.get(k) ?? []), Date.now()]);
}

export async function clearEvents(action: string, key: string) {
  const db = await getDb();
  if (db) await db.delete(rateEvents).where(and(eq(rateEvents.action, action), eq(rateEvents.key, key)));
  else memory.delete(`${action}:${key}`);
}
