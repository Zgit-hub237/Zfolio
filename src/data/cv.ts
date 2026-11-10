// Contenu du CV imprimable (/cv). Source unique : le PDF public/cv est généré depuis cette page.

export const cv = {
  name: "Loé Zegou Megnizon",
  headline: "Cybersécurité · Analyse, pentest & développement sécurisé",
  subheadline: "Étudiant en MSc Cybersecurity Management à l'ECE Paris",
  contact: [
    { label: "zegouloe237@gmail.com", href: "mailto:zegouloe237@gmail.com" },
    { label: "+33 7 48 23 65 53", href: "tel:+33748236553" },
    { label: "Vélizy-Villacoublay (78)", href: null },
    { label: "zfolio-zeta.vercel.app", href: "https://zfolio-zeta.vercel.app/" },
    { label: "linkedin.com/in/loe-zegou-megnizon", href: "https://www.linkedin.com/in/loe-zegou-megnizon-068066390/" },
    { label: "github.com/Zgit-hub237", href: "https://github.com/Zgit-hub237" },
  ],
  profile:
    "Étudiant en cybersécurité avec un solide parcours de développeur mobile, web et desktop. J'allie analyse de vulnérabilités, tests d'intrusion en laboratoire et conception d'applications sécurisées : authentification, contrôle d'accès, sécurité des API. Curieux et polyvalent, je veux contribuer à des projets de sécurité offensive comme défensive, en m'appuyant sur ma compréhension du code.",

  skills: [
    {
      title: "Sécurité offensive",
      items: ["Kali Linux", "MSFVenom", "Metasploitable", "Audit de vulnérabilités", "Vulnérabilités réseau"],
    },
    {
      title: "Sécurité applicative",
      items: ["OWASP API Top 10", "JWT & contrôle d'accès (RBAC)", "Authentification biométrique", "Cryptographie"],
    },
    {
      title: "Gouvernance (en formation)",
      items: ["ISO 27001", "RGPD", "Gestion des risques", "Réponse aux incidents"],
    },
    {
      title: "Systèmes",
      items: ["Windows Server", "VMware", "Virtualisation", "Détection des menaces"],
    },
    {
      title: "Développement",
      items: ["C / C++", "C# / .NET", "Java", "JavaScript", "Dart / Flutter", "React / Next.js", "Node.js / Express"],
    },
    {
      title: "Données & qualité",
      items: ["MySQL", "SQLite", "Firebase", "Playwright", "Jest", "Swagger / OpenAPI", "Git / GitHub"],
    },
  ],

  certifications: [
    { title: "Introduction à la cybersécurité", org: "Cisco Networking Academy", date: "2026", href: "https://www.credly.com/badges/319af8d9-1563-44af-8618-0347b98a0168/public_url" },
    { title: "API Security Fundamentals", org: "APISec University", date: "en cours", href: null },
  ],

  languages: [
    { name: "Français", level: "Natif" },
    { name: "Anglais", level: "Intermédiaire" },
  ],

  strengths: ["Esprit analytique et méthodique", "Adaptabilité", "Créativité", "Curiosité technique"],
  interests: ["Sport", "Musique", "Veille cybersécurité"],

  experience: [
    {
      role: "Développeur web",
      org: "SpeDev",
      place: "Yaoundé",
      period: "mars – juin 2026",
      bullets: [
        "Conception et développement en équipe d'applications web modernes (Next.js, Tailwind CSS) pour des clients variés.",
      ],
    },
    {
      role: "Développeur Flutter",
      org: "Med Prepa",
      place: "Télétravail",
      period: "oct. 2025 – mars 2026",
      bullets: [
        "Refonte d'une application mobile de préparation au concours de médecine au Cameroun.",
        "Clean architecture, intégration d'API, stockage local et gestion d'état ; tests et maintenance des fonctionnalités.",
      ],
    },
    {
      role: "Stagiaire développeur mobile",
      org: "PIALOA Technologie",
      place: "Yaoundé",
      period: "janv. – août 2025",
      bullets: [
        "Conception et déploiement d'une solution d'authentification biométrique sécurisée.",
        "Intégration mobile, gestion de la base de données et sécurité applicative.",
      ],
    },
    {
      role: "Professeur particulier",
      org: "Cours à domicile",
      place: "Yaoundé",
      period: "sept. 2024 – nov. 2026",
      bullets: [
        "Suivi de 3 élèves de première et terminale (séries C et TI) pendant 2 ans en mathématiques, physique et informatique.",
      ],
    },
  ],

  projects: [
    {
      name: "ZAUTHENTIK",
      tags: "Flutter · Biométrie · Sécurité",
      text: "Authentification biométrique sécurisée pour application mobile.",
      href: "https://github.com/Zgit-hub237/ZAUTHENTIK",
    },
    {
      name: "Propelize",
      tags: "Node.js · JWT · Playwright",
      text: "API de gestion de véhicules : JWT, autorisation par rôles, tests automatisés et documentation Swagger.",
      href: "https://github.com/Zgit-hub237/propelize-project",
    },
    {
      name: "SGP",
      tags: "C# · .NET · WPF",
      text: "Application desktop de gestion pénitentiaire avec authentification et suivi des dossiers.",
      href: "https://github.com/Zgit-hub237/SGP",
    },
    {
      name: "AnnounceApp",
      tags: "Flutter · Firebase",
      text: "Petites annonces multiplateforme : messagerie temps réel et authentification sécurisée.",
      href: "https://github.com/Zgit-hub237/AnnounceApp",
    },
    {
      name: "Hackathon ICT4D 2025 — 3e place",
      tags: "Mobile · 24 h",
      text: "SchoolAccess, plateforme rendant les manuels scolaires accessibles en plusieurs langues.",
      href: null,
    },
  ],

  education: [
    {
      degree: "MSc Cybersecurity Management",
      school: "ECE Paris",
      period: "depuis nov. 2026",
      text: "Gouvernance de la sécurité, gestion des risques cyber, conformité (ISO 27001, RGPD), réponse aux incidents.",
    },
    {
      degree: "Master I — Systèmes d'information & génie logiciel",
      school: "Université de Yaoundé I",
      period: "2025 – 2026",
      text: "Ingénierie logicielle et conception de systèmes d'information sécurisés.",
    },
    {
      degree: "Licence professionnelle en informatique",
      school: "Université de Yaoundé I",
      period: "2022 – 2025",
      text: "Spécialisation cybersécurité : cryptographie, audit de vulnérabilités, administration sécurisée.",
    },
  ],
};
