import { fr } from "@/i18n/fr";
import { en } from "@/i18n/en";
import type { TimelineGroupData, Translations } from "@/i18n/types";
import type { TimelineItem } from "@/lib/db/schema";
import { lines, tr, type Lang, type SiteContent } from "./types";

/** Combine les libellés fixes de l'interface (i18n) avec le contenu éditable de la base. */
export function buildTranslations(c: SiteContent, lang: Lang): Translations {
  const base = lang === "fr" ? fr : en;
  const p = c.profile;

  const toGroup = (item: TimelineItem): TimelineGroupData => ({
    period: tr(item.period, lang),
    items: [
      {
        title: tr(item.title, lang),
        company: [tr(item.org, lang), tr(item.place, lang)].filter(Boolean).join(", "),
        current: item.current,
        detail: {
          type: item.kind,
          description: tr(item.description, lang),
          duration: tr(item.duration, lang) || undefined,
          stats: item.stats?.[lang]?.length ? item.stats[lang] : undefined,
          tags: item.tags,
          credlyBadgeId: item.credlyBadgeId ?? undefined,
          certificateUrl: item.certificateUrl ?? undefined,
        },
      },
    ],
  });

  const visible = c.timeline.filter((i) => i.showOnSite);

  return {
    ...base,
    sidebar: { ...base.sidebar, subtitleLines: lines(tr(p.sidebarLines, lang)) },
    hero: {
      ...base.hero,
      line3: tr(p.hero.line3, lang),
      line4: tr(p.hero.line4, lang),
      tagline: tr(p.hero.tagline, lang),
    },
    about: { ...base.about, bio: tr(p.about.bio, lang), strengths: lines(tr(p.about.strengths, lang)) },
    resume: {
      ...base.resume,
      mainTimeline: visible.filter((i) => !i.older).map(toGroup),
      extraTimeline: visible.filter((i) => i.older).map(toGroup),
    },
    services: {
      ...base.services,
      counts: Object.fromEntries(c.services.map((sv) => [String(sv.id), tr(sv.count, lang)])),
      items: c.services.map((sv) => ({ title: tr(sv.title, lang), description: tr(sv.description, lang) })),
    },
    skills: {
      ...base.skills,
      secondarySkills: c.skills.filter((sk) => sk.kind === "secondary").map((sk) => sk.name),
    },
    projects: {
      ...base.projects,
      items: c.projects.map((pr) => ({ id: pr.id, title: tr(pr.title, lang), description: tr(pr.description, lang) })),
    },
  };
}
