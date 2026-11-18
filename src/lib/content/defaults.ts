/**
 * Contenu par défaut du site, construit à partir des anciens fichiers statiques.
 * Sert à remplir la base au premier lancement, et de secours si aucune base n'est configurée.
 */
import { fr } from "@/i18n/fr";
import { en } from "@/i18n/en";
import { personalInfo, projects as staticProjects } from "@/data/portfolio";
import type { L, Project, Service, Skill, TimelineItem } from "@/lib/db/schema";
import type { CvSkillGroup, Profile, SiteContent } from "./types";

const l = (frText: string, enText: string = frText): L => ({ fr: frText, en: enText });
const empty = l("");

/* ── Profil ── */
export const defaultProfile: Profile = {
  name: personalInfo.name,
  firstName: personalInfo.firstName,
  lastName: personalInfo.lastName,
  photo: "/images/profile.jpg",
  email: personalInfo.email,
  phone: personalInfo.phone,
  address: personalInfo.address,
  location: l("Vélizy-Villacoublay, France"),
  portfolioUrl: personalInfo.portfolio,
  social: { ...personalInfo.social },
  sidebarLines: l(fr.sidebar.subtitleLines.join("\n"), en.sidebar.subtitleLines.join("\n")),
  hero: {
    line3: l(fr.hero.line3, en.hero.line3),
    line4: l(fr.hero.line4, en.hero.line4),
    tagline: l(fr.hero.tagline, en.hero.tagline),
    yearsStudy: 4,
    proExp: 2,
  },
  about: {
    bio: l(fr.about.bio, en.about.bio),
    strengths: l(fr.about.strengths.join("\n"), en.about.strengths.join("\n")),
    badge: l("MSc ECE Paris • 2026"),
    factFormation: l("MSc ECE Paris"),
    factSpecialty: l("Cybersécurité", "Cybersecurity"),
    factLocation: l("Île-de-France"),
  },
  cv: {
    headline: l(
      "Cybersécurité · Analyse, pentest & développement sécurisé",
      "Cybersecurity · Analysis, pentest & secure development",
    ),
    subheadline: l(
      "Étudiant en MSc Cybersecurity Management à l'ECE Paris",
      "MSc Cybersecurity Management student at ECE Paris",
    ),
    profile: l(
      "Étudiant en cybersécurité avec un solide parcours de développeur mobile, web et desktop. J'allie analyse de vulnérabilités, tests d'intrusion en laboratoire et conception d'applications sécurisées : authentification, contrôle d'accès, sécurité des API. Curieux et polyvalent, je veux contribuer à des projets de sécurité offensive comme défensive, en m'appuyant sur ma compréhension du code.",
      "Cybersecurity student with a solid background as a mobile, web and desktop developer. I combine vulnerability analysis, lab penetration testing and the design of secure applications: authentication, access control, API security. Curious and versatile, I want to contribute to both offensive and defensive security projects, building on my understanding of code.",
    ),
    strengths: l(
      "Esprit analytique et méthodique\nAdaptabilité\nCréativité\nCuriosité technique",
      "Analytical and methodical mindset\nAdaptability\nCreativity\nTechnical curiosity",
    ),
    interests: l("Sport\nMusique\nVeille cybersécurité", "Sports\nMusic\nCybersecurity watch"),
    languages: [
      { name: l("Français", "French"), level: l("Natif", "Native") },
      { name: l("Anglais", "English"), level: l("Intermédiaire", "Intermediate") },
    ],
    pdfUrl: "",
  },
};

/* ── Parcours ── */
type Override = Partial<Omit<TimelineItem, "id">>;

// Index = ordre d'apparition dans l'ancienne frise (formations et expériences mêlées)
const timelineOverrides: Record<number, Override> = {
  0: { org: l("ECE"), place: l("Paris"), cvBullets: l("Gouvernance de la sécurité, gestion des risques cyber, conformité (ISO 27001, RGPD), réponse aux incidents.", "Security governance, cyber risk management, compliance (ISO 27001, GDPR), incident response.") },
  1: { org: l("APISec University"), place: l("En ligne", "Online"), certification: true },
  2: { title: l("Développeur web", "Web Developer"), org: l("SpeDev"), place: l("Yaoundé"), cvBullets: l("Conception et développement en équipe d'applications web modernes (Next.js, Tailwind CSS) pour des clients variés.", "Team design and development of modern web applications (Next.js, Tailwind CSS) for various clients.") },
  3: { org: l("Cisco Networking Academy"), place: l("En ligne", "Online"), certification: true },
  4: { cvBullets: l("Ingénierie logicielle et conception de systèmes d'information sécurisés.", "Software engineering and design of secure information systems.") },
  5: { showOnCv: false },
  6: { org: l("Med Prepa"), place: l("Télétravail", "Remote"), cvBullets: l("Refonte d'une application mobile de préparation au concours de médecine au Cameroun.\nClean architecture, intégration d'API, stockage local et gestion d'état ; tests et maintenance des fonctionnalités.", "Redesign of a mobile app preparing students for the medical school entrance exam in Cameroon.\nClean architecture, API integration, local storage and state management; feature testing and maintenance.") },
  7: { org: l("PIALOA Technologie"), place: l("Yaoundé"), cvBullets: l("Conception et déploiement d'une solution d'authentification biométrique sécurisée.\nIntégration mobile, gestion de la base de données et sécurité applicative.", "Design and deployment of a secure biometric authentication solution.\nMobile integration, database management and application security.") },
  8: { showOnCv: false },
  9: { showOnCv: false },
  10: { org: l("Cours à domicile", "Home tutoring"), place: l("Yaoundé"), cvBullets: l("Suivi de 3 élèves de première et terminale (séries C et TI) pendant 2 ans en mathématiques, physique et informatique.", "Tutored 3 upper secondary students (C and TI series) over 2 years in mathematics, physics and computer science.") },
  11: { org: l("Université de Yaoundé I", "University of Yaoundé I"), cvBullets: l("Spécialisation cybersécurité : cryptographie, audit de vulnérabilités, administration sécurisée.", "Cybersecurity specialization: cryptography, vulnerability auditing, secure administration.") },
};

function buildTimeline(): TimelineItem[] {
  const flat = (groups: typeof fr.resume.mainTimeline) =>
    groups.flatMap((g) => g.items.map((item) => ({ period: g.period, item })));
  const frMain = flat(fr.resume.mainTimeline);
  const enMain = flat(en.resume.mainTimeline);
  const frExtra = flat(fr.resume.extraTimeline);
  const enExtra = flat(en.resume.extraTimeline);

  const make = (a: (typeof frMain)[number], b: (typeof frMain)[number] | undefined, index: number, older: boolean): TimelineItem => {
    const bi = b ?? a;
    const base: TimelineItem = {
      id: index + 1,
      kind: a.item.detail.type,
      title: l(a.item.title, bi.item.title),
      org: l(a.item.company, bi.item.company),
      place: empty,
      period: l(a.period, bi.period),
      duration: l(a.item.detail.duration ?? "", bi.item.detail.duration ?? ""),
      description: l(a.item.detail.description, bi.item.detail.description),
      cvBullets: empty,
      tags: a.item.detail.tags,
      stats: { fr: a.item.detail.stats ?? [], en: bi.item.detail.stats ?? [] },
      current: a.item.current,
      older,
      certification: false,
      credlyBadgeId: a.item.detail.credlyBadgeId ?? null,
      certificateUrl: a.item.detail.certificateUrl ?? null,
      showOnSite: true,
      showOnCv: !older,
      sortOrder: (index + 1) * 10,
    };
    return older ? base : { ...base, ...timelineOverrides[index] };
  };

  return [
    ...frMain.map((a, i) => make(a, enMain[i], i, false)),
    ...frExtra.map((a, i) => make(a, enExtra[i], frMain.length + i, true)),
  ];
}

/* ── Projets ── */
const projectCv: Record<number, Pick<Project, "cvText" | "cvTags" | "showOnCv">> = {
  1: { cvText: empty, cvTags: "", showOnCv: false },
  2: { cvText: l("Petites annonces multiplateforme : messagerie temps réel et authentification sécurisée.", "Cross-platform classifieds: real-time messaging and secure authentication."), cvTags: "Flutter · Firebase", showOnCv: true },
  3: { cvText: l("Authentification biométrique sécurisée pour application mobile.", "Secure biometric authentication for a mobile app."), cvTags: "Flutter · Biométrie · Sécurité", showOnCv: true },
  4: { cvText: l("API de gestion de véhicules : JWT, autorisation par rôles, tests automatisés et documentation Swagger.", "Vehicle management API: JWT, role-based authorization, automated tests and Swagger docs."), cvTags: "Node.js · JWT · Playwright", showOnCv: true },
  5: { cvText: empty, cvTags: "", showOnCv: false },
  6: { cvText: l("Application desktop de gestion pénitentiaire avec authentification et suivi des dossiers.", "Desktop prison management app with authentication and case tracking."), cvTags: "C# · .NET · WPF", showOnCv: true },
};

function buildProjects(): Project[] {
  const list: Project[] = staticProjects.map((p, i) => {
    const frItem = fr.projects.items.find((x) => x.id === p.id);
    const enItem = en.projects.items.find((x) => x.id === p.id);
    const titleFr = p.id === 3 ? "ZAUTHENTIK — Authentification biométrique" : frItem?.title ?? p.title;
    const titleEn = p.id === 3 ? "ZAUTHENTIK — Biometric authentication" : enItem?.title ?? p.title;
    return {
      id: i + 1,
      title: l(titleFr, titleEn),
      description: l(frItem?.description ?? p.description, enItem?.description ?? p.description),
      image: null,
      tags: p.tags,
      category: p.category,
      link: p.link,
      github: p.github,
      published: true,
      sortOrder: (i + 1) * 10,
      ...projectCv[p.id],
    };
  });
  list.push({
    id: list.length + 1,
    title: l("Hackathon ICT4D 2025 — 3e place", "ICT4D Hackathon 2025 — 3rd place"),
    description: l(
      "SchoolAccess : plateforme mobile rendant les manuels scolaires accessibles en plusieurs langues, développée en équipe en 24 h.",
      "SchoolAccess: mobile platform making school textbooks accessible in several languages, built as a team in 24 hours.",
    ),
    cvText: l("SchoolAccess, plateforme rendant les manuels scolaires accessibles en plusieurs langues.", "SchoolAccess, a platform making school textbooks accessible in several languages."),
    cvTags: "Mobile · 24 h",
    image: null,
    tags: ["Hackathon", "Mobile", "Équipe"],
    category: "mobile",
    link: null,
    github: null,
    published: true,
    showOnCv: true,
    sortOrder: (list.length + 1) * 10,
  });
  return list;
}

/* ── Services ── */
const defaultServices: Service[] = [
  { icon: "shield", key: 0 },
  { icon: "globe", key: 1 },
  { icon: "smartphone", key: 2 },
  { icon: "monitor", key: 3 },
].map(({ icon, key }, i) => ({
  id: i + 1,
  icon,
  title: l(fr.services.items[key].title, en.services.items[key].title),
  description: l(fr.services.items[key].description, en.services.items[key].description),
  count: l(fr.services.counts[icon] ?? "", en.services.counts[icon] ?? ""),
  sortOrder: (i + 1) * 10,
}));

/* ── Compétences ── */
const circleSkills: Array<[string, number, string]> = [
  ["Flutter", 85, "/logos/flutter.jpg"],
  ["Firebase", 80, "/logos/firebas.jpg"],
  ["React", 75, "/logos/react.jpg"],
  ["JavaScript", 78, "/logos/javascript.jpg"],
  ["Kali Linux", 75, "/logos/kalilinux.jpg"],
  ["MySQL", 78, "/logos/mysql.jpg"],
  ["C / C++", 72, "/logos/c.jpg"],
  ["Laravel", 68, "/logos/laravel.jpg"],
];

const defaultSkills: Skill[] = [
  ...circleSkills.map(([name, percent, logo], i): Skill => ({ id: i + 1, name, kind: "circle", percent, logo, sortOrder: (i + 1) * 10 })),
  ...fr.skills.secondarySkills.map((name, i): Skill => ({
    id: circleSkills.length + i + 1,
    name,
    kind: "secondary",
    percent: 0,
    logo: null,
    sortOrder: (i + 1) * 10,
  })),
];

export const defaultCvSkills: CvSkillGroup[] = [
  { title: l("Sécurité offensive", "Offensive security"), items: ["Kali Linux", "MSFVenom", "Metasploitable", "Audit de vulnérabilités", "Vulnérabilités réseau"] },
  { title: l("Sécurité applicative", "Application security"), items: ["OWASP API Top 10", "JWT & contrôle d'accès (RBAC)", "Authentification biométrique", "Cryptographie"] },
  { title: l("Gouvernance (en formation)", "Governance (in training)"), items: ["ISO 27001", "RGPD", "Gestion des risques", "Réponse aux incidents"] },
  { title: l("Systèmes", "Systems"), items: ["Windows Server", "VMware", "Virtualisation", "Détection des menaces"] },
  { title: l("Développement", "Development"), items: ["C / C++", "C# / .NET", "Java", "JavaScript", "Dart / Flutter", "React / Next.js", "Node.js / Express"] },
  { title: l("Données & qualité", "Data & quality"), items: ["MySQL", "SQLite", "Firebase", "Playwright", "Jest", "Swagger / OpenAPI", "Git / GitHub"] },
];

export function getDefaultContent(): SiteContent {
  return {
    profile: defaultProfile,
    timeline: buildTimeline(),
    projects: buildProjects(),
    services: defaultServices,
    skills: defaultSkills,
    cvSkills: defaultCvSkills,
  };
}
