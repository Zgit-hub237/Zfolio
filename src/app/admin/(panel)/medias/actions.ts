"use server";

import { unlink } from "node:fs/promises";
import path from "node:path";
import { eq } from "drizzle-orm";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { media } from "@/lib/db/schema";
import { isAllowedType } from "@/lib/admin/media-rules";
import { safeUrl } from "@/lib/admin/form";
import { adminDb, savedAndBack } from "@/lib/admin/util";

export async function registerMedia(input: { url: string; pathname: string; contentType: string; size: number }) {
  await requireAdmin();
  const url = safeUrl(String(input.url));
  if (!url || !isAllowedType(String(input.contentType))) return;
  const db = await getDb();
  if (!db) return;
  await db.insert(media).values({
    url,
    pathname: String(input.pathname).slice(0, 300),
    contentType: String(input.contentType),
    size: Math.max(0, Math.floor(Number(input.size) || 0)),
  });
  revalidatePath("/admin/medias");
}

export async function deleteMedia(fd: FormData) {
  const db = await adminDb("/admin/medias");
  const id = Number(fd.get("id"));
  const [row] = await db.select().from(media).where(eq(media.id, id)).limit(1);
  if (row) {
    try {
      if (row.url.includes(".blob.vercel-storage.com")) {
        await del(row.url);
      } else if (row.url.startsWith("/uploads/")) {
        const file = path.join(process.cwd(), "public", "uploads", path.basename(row.url));
        await unlink(file);
      }
    } catch (err) {
      console.error("[media] suppression du fichier :", err);
    }
    await db.delete(media).where(eq(media.id, id));
  }
  savedAndBack("/admin/medias");
}
