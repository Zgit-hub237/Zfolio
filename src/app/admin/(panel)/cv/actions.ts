"use server";

import { settings } from "@/lib/db/schema";
import { getSiteContent } from "@/lib/content/get";
import { l, str, url } from "@/lib/admin/form";
import { adminDb, savedAndBack } from "@/lib/admin/util";

export async function saveCv(fd: FormData) {
  const db = await adminDb("/admin/cv");
  const profile = (await getSiteContent()).profile;

  const languages = [];
  for (let i = 0; i < 6; i++) {
    const name = { fr: str(fd, `lang${i}_name_fr`, 40), en: str(fd, `lang${i}_name_en`, 40) };
    const level = { fr: str(fd, `lang${i}_level_fr`, 40), en: str(fd, `lang${i}_level_en`, 40) };
    if (name.fr || name.en) languages.push({ name, level });
  }

  const next = {
    ...profile,
    cv: {
      headline: l(fd, "headline", 200),
      subheadline: l(fd, "subheadline", 200),
      profile: l(fd, "profile", 1500),
      strengths: l(fd, "strengths", 600),
      interests: l(fd, "interests", 600),
      languages,
      pdfUrl: url(fd, "pdfUrl") ?? "",
    },
  };

  await db
    .insert(settings)
    .values({ key: "profile", value: next })
    .onConflictDoUpdate({ target: settings.key, set: { value: next, updatedAt: new Date() } });
  savedAndBack("/admin/cv");
}
