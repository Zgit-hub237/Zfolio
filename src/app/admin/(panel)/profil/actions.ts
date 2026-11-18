"use server";

import { settings } from "@/lib/db/schema";
import { getSiteContent } from "@/lib/content/get";
import type { Profile } from "@/lib/content/types";
import { int, l, safeUrl, str, url } from "@/lib/admin/form";
import { adminDb, savedAndBack } from "@/lib/admin/util";

export async function saveProfile(fd: FormData) {
  const db = await adminDb("/admin/profil");
  const current = (await getSiteContent()).profile;

  const profile: Profile = {
    ...current,
    name: str(fd, "name", 120) || current.name,
    firstName: str(fd, "firstName", 60),
    lastName: str(fd, "lastName", 60),
    photo: url(fd, "photo") ?? current.photo,
    email: str(fd, "email", 200),
    phone: str(fd, "phone", 40),
    address: str(fd, "address", 200),
    location: l(fd, "location", 120),
    portfolioUrl: url(fd, "portfolioUrl") ?? "",
    social: {
      github: url(fd, "github") ?? "",
      linkedin: url(fd, "linkedin") ?? "",
      instagram: url(fd, "instagram") ?? "",
      whatsapp: url(fd, "whatsapp") ?? "",
    },
    sidebarLines: l(fd, "sidebarLines", 300),
    hero: {
      line3: l(fd, "heroLine3", 80),
      line4: l(fd, "heroLine4", 80),
      tagline: l(fd, "heroTagline", 300),
      yearsStudy: int(fd, "yearsStudy", current.hero.yearsStudy, 0, 50),
      proExp: int(fd, "proExp", current.hero.proExp, 0, 50),
    },
    about: {
      bio: l(fd, "bio", 3000),
      strengths: l(fd, "strengths", 1000),
      badge: l(fd, "aboutBadge", 80),
      factFormation: l(fd, "factFormation", 80),
      factSpecialty: l(fd, "factSpecialty", 80),
      factLocation: l(fd, "factLocation", 80),
    },
    cv: current.cv,
  };

  // Sans e-mail valide, on garde l'ancien (évite de casser le lien de contact)
  if (!safeUrl(`mailto:${profile.email}`, { allowMail: true }) || !profile.email.includes("@")) profile.email = current.email;

  await db
    .insert(settings)
    .values({ key: "profile", value: profile })
    .onConflictDoUpdate({ target: settings.key, set: { value: profile, updatedAt: new Date() } });

  savedAndBack("/admin/profil");
}
