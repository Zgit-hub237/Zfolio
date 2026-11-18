import "server-only";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getDb, type DB } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

/** Vérifie la session admin et renvoie la base (ou redirige avec une erreur). */
export async function adminDb(backTo: string): Promise<DB> {
  await requireAdmin();
  const db = await getDb();
  if (!db) redirect(`${backTo}?error=${encodeURIComponent("Aucune base de données configurée (DATABASE_URL).")}`);
  return db;
}

/** Rafraîchit tout le site public puis revient à la page indiquée avec un message de succès. */
export function savedAndBack(path: string): never {
  revalidatePath("/", "layout");
  redirect(`${path}${path.includes("?") ? "&" : "?"}saved=1`);
}

export type SearchParams = Promise<{ saved?: string; error?: string }>;
