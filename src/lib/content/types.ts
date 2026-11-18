import type { L, Project, Service, Skill, TimelineItem } from "@/lib/db/schema";

export type { L };
export type Lang = "fr" | "en";

export type Profile = {
  name: string;
  firstName: string;
  lastName: string;
  photo: string;
  email: string;
  phone: string;
  address: string;
  location: L;
  portfolioUrl: string;
  social: { github: string; linkedin: string; instagram: string; whatsapp: string };
  /** Une ligne par retour à la ligne */
  sidebarLines: L;
  hero: { line3: L; line4: L; tagline: L; yearsStudy: number; proExp: number };
  about: {
    bio: L;
    /** Une qualité par ligne */
    strengths: L;
    badge: L;
    factFormation: L;
    factSpecialty: L;
    factLocation: L;
  };
  cv: {
    headline: L;
    subheadline: L;
    profile: L;
    strengths: L;
    interests: L;
    languages: { name: L; level: L }[];
    /** PDF téléversé ; vide = PDF par défaut du dépôt */
    pdfUrl: string;
  };
};

export type CvSkillGroup = { title: L; items: string[] };

export type SiteContent = {
  profile: Profile;
  timeline: TimelineItem[];
  projects: Project[];
  services: Service[];
  skills: Skill[];
  cvSkills: CvSkillGroup[];
};

export const DEFAULT_CV_PDF = "/cv/CV_LOE_ZEGOU_MEGNIZON.pdf";

export const tr = (value: L | undefined | null, lang: Lang) =>
  (value?.[lang] || value?.fr || value?.en || "").trim();

export const lines = (text: string) =>
  text
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);
