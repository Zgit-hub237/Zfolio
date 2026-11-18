"use server";

import { and, eq, ne } from "drizzle-orm";
import { redirect } from "next/navigation";
import { posts } from "@/lib/db/schema";
import { list, longStr, slugify, str, url } from "@/lib/admin/form";
import { adminDb, savedAndBack } from "@/lib/admin/util";

export async function savePost(fd: FormData) {
  const db = await adminDb("/admin/blog");
  const id = str(fd, "id");
  const isNew = id === "new" || !id;
  const title = str(fd, "title", 200);
  if (!title) redirect(`/admin/blog/${isNew ? "new" : id}?error=${encodeURIComponent("Le titre est obligatoire.")}`);

  // Slug unique, dérivé du titre si vide
  const base = slugify(str(fd, "slug", 100) || title) || `article-${Date.now()}`;
  let slug = base;
  for (let n = 2; ; n++) {
    const clash = await db
      .select({ id: posts.id })
      .from(posts)
      .where(isNew ? eq(posts.slug, slug) : and(eq(posts.slug, slug), ne(posts.id, Number(id))))
      .limit(1);
    if (clash.length === 0) break;
    slug = `${base}-${n}`;
  }

  const status = str(fd, "status") === "published" ? "published" : "draft";
  const dateInput = str(fd, "publishedAt", 40);
  const parsed = dateInput ? new Date(dateInput) : null;
  const publishedAt = status === "published" ? (parsed && !Number.isNaN(parsed.getTime()) ? parsed : new Date()) : parsed && !Number.isNaN(parsed.getTime()) ? parsed : null;

  const values = {
    slug,
    lang: (str(fd, "lang") === "en" ? "en" : "fr") as "fr" | "en",
    title,
    excerpt: str(fd, "excerpt", 500),
    content: longStr(fd, "content"),
    coverImage: url(fd, "coverImage"),
    videoUrl: url(fd, "videoUrl"),
    tags: list(fd, "tags").slice(0, 10),
    status: status as "draft" | "published",
    publishedAt,
    updatedAt: new Date(),
  };

  if (isNew) {
    const [row] = await db.insert(posts).values(values).returning({ id: posts.id });
    savedAndBack(`/admin/blog/${row.id}`);
  }
  await db.update(posts).set(values).where(eq(posts.id, Number(id)));
  savedAndBack(`/admin/blog/${id}`);
}

export async function deletePost(fd: FormData) {
  const db = await adminDb("/admin/blog");
  await db.delete(posts).where(eq(posts.id, Number(fd.get("id"))));
  savedAndBack("/admin/blog");
}
