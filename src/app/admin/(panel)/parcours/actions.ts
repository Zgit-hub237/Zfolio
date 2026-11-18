"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { timelineItems, type Stat } from "@/lib/db/schema";
import { bool, int, l, list, str, url } from "@/lib/admin/form";
import { adminDb, savedAndBack } from "@/lib/admin/util";

const parseStats = (text: string): Stat[] =>
  text
    .split(/\r?\n/)
    .map((line) => line.split(/\s*:\s*/))
    .filter((parts) => parts.length >= 2 && parts[0])
    .map(([label, ...rest]) => ({ label: label.trim(), value: rest.join(":").trim() }))
    .slice(0, 6);

export async function saveTimeline(fd: FormData) {
  const db = await adminDb("/admin/parcours");
  const id = str(fd, "id");
  const title = l(fd, "title", 200);
  if (!title.fr && !title.en) redirect(`/admin/parcours/${id || "new"}?error=${encodeURIComponent("Le titre est obligatoire.")}`);

  const values = {
    kind: (str(fd, "kind") === "experience" ? "experience" : "education") as "education" | "experience",
    title,
    org: l(fd, "org", 200),
    place: l(fd, "place", 120),
    period: l(fd, "period", 120),
    duration: l(fd, "duration", 80),
    description: l(fd, "description", 3000),
    cvBullets: l(fd, "cvBullets", 2000),
    tags: list(fd, "tags"),
    stats: { fr: parseStats(str(fd, "stats_fr", 1000)), en: parseStats(str(fd, "stats_en", 1000)) },
    current: bool(fd, "current"),
    older: bool(fd, "older"),
    certification: bool(fd, "certification"),
    credlyBadgeId: str(fd, "credlyBadgeId", 80).replace(/[^a-zA-Z0-9-]/g, "") || null,
    certificateUrl: url(fd, "certificateUrl"),
    showOnSite: bool(fd, "showOnSite"),
    showOnCv: bool(fd, "showOnCv"),
    sortOrder: int(fd, "sortOrder", 0),
  };

  if (id === "new" || !id) {
    await db.insert(timelineItems).values(values);
  } else {
    await db.update(timelineItems).set(values).where(eq(timelineItems.id, Number(id)));
  }
  savedAndBack("/admin/parcours");
}

export async function deleteTimeline(fd: FormData) {
  const db = await adminDb("/admin/parcours");
  await db.delete(timelineItems).where(eq(timelineItems.id, Number(fd.get("id"))));
  savedAndBack("/admin/parcours");
}
