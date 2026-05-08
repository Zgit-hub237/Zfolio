export const personalInfo = {
  name: "Loé Zegou Megnizon",
  firstName: "Loé",
  lastName: "Zegou",
  title: "Étudiant en Informatique",
  subtitle: "Cybersécurité & Génie Logiciel",
  tagline: "Je conçois des solutions numériques fiables, performantes et sécurisées.",
  bio: "Passionné par la cybersécurité, le développement logiciel et les technologies émergentes, je fais preuve d'une grande curiosité et d'un sens aigu de l'analyse. Mon objectif est de concevoir des solutions numériques fiables, performantes et sécurisées, tout en explorant de nouvelles approches pour allier innovation et qualité logicielle.",
  email: "zegouloe237@gmail.com",
  phone: "+237 6 93 45 49 77",
  location: "Yaoundé, Cameroun",
  address: "Nsymeyon II - Damas, Yaoundé",
  portfolio: "https://zportfolio-main-ajkbik.laravel.cloud/",
  social: {
    github: "https://github.com/Zgit-hub237",
    linkedin: "https://www.linkedin.com/in/loe-zegou-068066390/",
    instagram: "https://www.instagram.com/z_loe237?igsh=NGgyNGY4dGU4c29q",
    whatsapp: "https://wa.me/qr/6OJJBZF2OOCUJ1",
  },
  languages: [
    { name: "Français", level: "Natif", percent: 100 },
    { name: "Anglais", level: "Intermédiaire", percent: 65 },
  ],
  strengths: [
    "Créativité",
    "Adaptabilité",
    "Passion pour l'innovation technologique",
    "Esprit analytique et méthodique",
  ],
  interests: ["Sport", "Musique", "Réseaux sociaux", "Informatique"],
};

export const skills = {
  languages: [
    { name: "JavaScript", percent: 78 },
    { name: "Dart / Flutter", percent: 85 },
    { name: "C / C++", percent: 72 },
    { name: "Java", percent: 70 },
    { name: "C#", percent: 65 },
    { name: "HTML / CSS", percent: 88 },
  ],
  frameworks: [
    { name: "Flutter SDK", percent: 85 },
    { name: "React / Next.js", percent: 75 },
    { name: "Firebase", percent: 80 },
    { name: "Entity Framework", percent: 65 },
    { name: "MySQL / SQLite", percent: 78 },
  ],
  security: [
    { name: "Kali Linux", percent: 75 },
    { name: "Audit de vulnérabilités", percent: 70 },
    { name: "MSFVenom", percent: 65 },
    { name: "VMware / Virtualisation", percent: 72 },
    { name: "Windows Server", percent: 68 },
  ],
};

export const education = [
  {
    id: 1,
    degree: "Master I",
    field: "Génie Logiciel & Systèmes Sécurisés",
    school: "Université de Yaoundé I",
    location: "Yaoundé, Cameroun",
    period: "Depuis octobre 2025",
    current: true,
    description:
      "Approfondissement en ingénierie logicielle, conception de systèmes d'information sécurisés et intégration de technologies avancées.",
  },
  {
    id: 2,
    degree: "Licence Professionnelle en Informatique",
    field: "Spécialisation Cybersécurité",
    school: "Université de Yaoundé I",
    location: "Yaoundé, Cameroun",
    period: "Septembre 2022 – Juillet 2025",
    current: false,
    description:
      "L3 : Cryptographie, audit de vulnérabilités, administration sécurisée. L2 : Développement logiciel, bases de données, réseaux. L1 : Algorithmique, programmation, mathématiques appliquées.",
  },
];

export const experience = [
  {
    id: 1,
    role: "Développeur FreeLance",
    company: "Projet Personnel",
    period: "Depuis septembre 2025",
    duration: "5 mois",
    current: true,
    description:
      "Conception et développement d'un portfolio professionnel responsive avec Next.js. Interface d'administration pour la gestion du contenu, système de projet intégré, avec service de messagerie.",
    tags: ["Next.js", "React", "Node.js", "Responsive Design"],
  },
  {
    id: 2,
    role: "Développeur FreeLance",
    company: "Projet Personnel",
    period: "Août 2025 – Octobre 2025",
    duration: "2 mois",
    current: false,
    description:
      "Conception et développement d'une application mobile multiplateforme de petites annonces avec Flutter et Firebase. Gestion complète du cycle de vie des annonces, système de messagerie en temps réel, et authentification sécurisée.",
    tags: ["Flutter", "Firebase", "Dart", "Real-time messaging"],
  },
  {
    id: 3,
    role: "Stagiaire Développeur Mobile",
    company: "PIALOA Technologie",
    period: "Janvier 2025 – Août 2025",
    duration: "7 mois",
    current: false,
    description:
      "Conception et déploiement d'une solution d'authentification biométrique sécurisée. Intégration mobile, gestion de base de données et sécurité applicative.",
    tags: ["Mobile", "Biométrie", "Sécurité", "Base de données"],
  },
];

export const services = [
  {
    id: 1,
    icon: "smartphone",
    title: "Développement Mobile",
    description:
      "Applications Android performantes avec Flutter. Interfaces modernes, intégration Firebase, gestion de l'état et optimisation pour une expérience utilisateur fluide.",
    highlights: ["Flutter & Dart", "Firebase", "UI/UX Mobile"],
  },
  {
    id: 2,
    icon: "globe",
    title: "Développement Web",
    description:
      "Sites web et applications web modernes avec React, Next.js et Laravel. Interfaces responsives, SEO-friendly et haute performance.",
    highlights: ["React / Next.js", "Laravel / PHP", "MySQL"],
  },
  {
    id: 3,
    icon: "monitor",
    title: "Développement Desktop",
    description:
      "Applications desktop robustes avec C# et .NET. Interfaces riches WPF/WinForms, gestion de base de données et intégration système Windows.",
    highlights: ["C# / .NET", "WPF / WinForms", "MySQL / SQLite"],
  },
  {
    id: 4,
    icon: "shield",
    title: "Cybersécurité",
    description:
      "Audit de vulnérabilités,Chiffrement, tests de pénétration et sécurisation d'applications. Expertise en cryptographie et administration sécurisée des systèmes.",
    highlights: ["Audit de vulnérabilités", "Tests de pénétration", "Cryptographie", "Kali Linux"],
  },
];

export const projects = [
  {
    id: 1,
    title: "Portfolio Next.js",
    description:
      "Portfolio professionnel responsive avec nextjs, interface d'administration pour la gestion du contenu, système de projet intégré et service de messagerie.",
    image: "/images/project-portfolio.jpg",
    tags: ["Next.js", "MySQL", "CSS"],
    category: "web",
    link: "https://zfolio-zeta.vercel.app/",
    github: "https://github.com/Zgit-hub237/Zfolio/",
  },
  {
    id: 2,
    title: "AnnounceApp",
    description:
      "Application mobile multiplateforme de petites annonces avec système de messagerie en temps réel et authentification sécurisée.",
    image: "/images/project-annonces.jpg",
    tags: ["Flutter", "Firebase", "Dart", "Real-time"],
    category: "mobile",
    link: null,
    github: "https://github.com/Zgit-hub237/AnnounceApp/",
  },
  {
    id: 3,
    title: "Authentification Biométrique",
    description:
      "Solution d'authentification biométrique sécurisée pour application mobile. Intégration native, gestion de base de données et sécurité applicative.",
    image: "/images/project-biometrie.jpg",
    tags: ["Mobile", "Sécurité", "Biométrie", "SQLite"],
    category: "security",
    link: null,
    github: "https://github.com/Zgit-hub237/ZAUTHENTIK",
  },
  {
    id: 4,
    title: "Propelize",
    description:
      "Système complet de gestion des véhicules avec authentification JWT, autorisation par rôles et interface web responsive. Tests automatisés Playwright et documentation Swagger/OpenAPI.",
    image: "/images/project-propelize.jpg",
    tags: ["Node.js", "Express", "SQLite", "JWT", "Playwright", "Swagger"],
    category: "web",
    link: null,
    github: "https://github.com/Zgit-hub237/propelize-project",
  },
  {
    id: 5,
    title: "Dataflow Testing",
    description:
      "Démonstration des méthodologies de couverture de flux de données : All-Defs, All-Uses et All-DU-Paths. Comparatif tests complets (100%) vs tests incomplets.",
    image: "/images/project-dataflow.jpg",
    tags: ["JavaScript", "Jest", "Tests", "Coverage", "White-box"],
    category: "web",
    link: null,
    github: "https://github.com/Zgit-hub237/dataflow-testing-project",
  },
];

export const stats = [
  { value: "3+", label: "Années d'études" },
  { value: "3", label: "Projets réalisés" },
  { value: "7", label: "Mois de stage" },
  { value: "2", label: "Langues" },
];
