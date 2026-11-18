"use server";

import { eq } from "drizzle-orm";
import { settings, skills } from "@/lib/db/schema";
import type { CvSkillGroup } from "@/lib/content/types";
import { int, list, str, url } from "@/lib/admin/form";
import { adminDb, savedAndBack } from "@/lib/admin/util";

export async function saveSkill(fd: FormData) {
  const db = await adminDb("/admin/competences");
  const id = str(fd, "id");
  const name = str(fd, "name", 60);
  if (!name) savedAndBack("/admin/competences");
  const values = {
    name,
    kind: (str(fd, "kind") === "secondary" ? "secondary" : "circle") as "circle" | "secondary",
    percent: int(fd, "percent", 70, 0, 100),
    logo: url(fd, "logo"),
    sortOrder: int(fd, "sortOrder", 0),
  };
  if (id === "new" || !id) await db.insert(skills).values(values);
  else await db.update(skills).set(values).where(eq(skills.id, Number(id)));
  savedAndBack("/admin/competences");
}

export async function deleteSkill(fd: FormData) {
  const db = await adminDb("/admin/competences");
  await db.delete(skills).where(eq(skills.id, Number(fd.get("id"))));
  savedAndBack("/admin/competences");
}

/** Groupes de compétences du CV : lignes répétées title_fr[i], title_en[i], items[i]. */
export async function saveCvSkills(fd: FormData) {
  const db = await adminDb("/admin/competences");
  const groups: CvSkillGroup[] = [];
  for (let i = 0; i < 12; i++) {
    const fr = str(fd, `g${i}_title_fr`, 80);
    const en = str(fd, `g${i}_title_en`, 80);
    const items = list(fd, `g${i}_items`).slice(0, 15);
    if ((fr || en) && items.length) groups.push({ title: { fr, en }, items });
  }
  await db
    .insert(settings)
    .values({ key: "cvSkills", value: groups })
    .onConflictDoUpdate({ target: settings.key, set: { value: groups, updatedAt: new Date() } });
  savedAndBack("/admin/competences");
}
