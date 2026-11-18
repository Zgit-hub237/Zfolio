"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { projects } from "@/lib/db/schema";
import { bool, int, l, list, str, url } from "@/lib/admin/form";
import { adminDb, savedAndBack } from "@/lib/admin/util";

const CATEGORIES = ["web", "mobile", "desktop", "security"];

export async function saveProject(fd: FormData) {
  const db = await adminDb("/admin/projets");
  const id = str(fd, "id");
  const title = l(fd, "title", 200);
  if (!title.fr && !title.en) redirect(`/admin/projets/${id || "new"}?error=${encodeURIComponent("Le titre est obligatoire.")}`);
  const category = str(fd, "category");

  const values = {
    title,
    description: l(fd, "description", 3000),
    cvText: l(fd, "cvText", 600),
    cvTags: str(fd, "cvTags", 120),
    image: url(fd, "image"),
    tags: list(fd, "tags"),
    category: CATEGORIES.includes(category) ? category : "web",
    link: url(fd, "link"),
    github: url(fd, "github"),
    published: bool(fd, "published"),
    showOnCv: bool(fd, "showOnCv"),
    sortOrder: int(fd, "sortOrder", 0),
  };

  if (id === "new" || !id) await db.insert(projects).values(values);
  else await db.update(projects).set(values).where(eq(projects.id, Number(id)));
  savedAndBack("/admin/projets");
}

export async function deleteProject(fd: FormData) {
  const db = await adminDb("/admin/projets");
  await db.delete(projects).where(eq(projects.id, Number(fd.get("id"))));
  savedAndBack("/admin/projets");
}
