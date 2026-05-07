import type { Translations } from "./types";

export const fr: Translations = {
  nav: {
    home: "Accueil",
    about: "À propos",
    resume: "CV",
    services: "Services",
    skills: "Compétences",
    projects: "Portefeuille",
    contact: "Contact",
    menu: "Menu",
  },
  sidebar: {
    subtitleLines: ["Étudiant en", "Informatique,", "Génie Logiciel &", "Cybersécurité"],
    copyright: "© Loé Zegou 2025. Tous droits réservés",
    downloadCV: "Télécharger CV",
    contactMe: "ME CONTACTER",
  },
  hero: {
    badge: "Introduction",
    greeting: "Bonjour, je suis",
    line3: "étudiant passionné",
    line4: "d'informatique",
    tagline: "Je conçois des solutions numériques fiables, performantes et sécurisées.",
    yearsStudy: "Années d'études",
    proExp: "Expérience Pro",
    circularText: "MES PROJETS • MES PROJETS •",
  },
  about: {
    badge: "À propos",
    heading1: "Chaque grande solution",
    heading2: "numérique commence par",
    heading3: "une histoire",
    heading4: "encore meilleure",
    bio: "Passionné par la cybersécurité, le développement logiciel et les technologies émergentes, je fais preuve d'une grande curiosité et d'un sens aigu de l'analyse. Mon objectif est de concevoir des solutions numériques fiables, performantes et sécurisées, tout en explorant de nouvelles approches pour allier innovation et qualité logicielle.",
    strengths: [
      "Créativité",
      "Adaptabilité",
      "Passion pour l'innovation technologique",
      "Esprit analytique et méthodique",
    ],
  },
  resume: {
    badge: "CV",
    heading1: "Formation et",
    heading2: "expérience",
    downloadCV: "Télécharger mon CV",
    ongoing: "En cours",
    educationLabel: "Formation",
    experienceLabel: "Expérience",
    showMore: "Voir plus — formations antérieures (BAC, Probatoire, BEPC)",
    showLess: "Voir moins",
    mainTimeline: [
      {
        period: "Juin 2026 — Présent",
        items: [
          {
            title: "Web Développeur",
            company: "SpeDev, Yaoundé",
            current: true,
            detail: {
              type: "experience",
              description:
                "Conception et développement d'applications web modernes au sein de SpeDev. Collaboration en équipe sur des projets clients variés.",
              tags: ["Next.js", "Tailwind CSS", "Web", "SpeDev"],
            },
          },
        ],
      },
      {
        period: "Oct. 2025 — Présent",
        items: [
          {
            title: "Master I — Système d'Information & Génie Logiciel",
            company: "Université de Yaoundé I",
            current: true,
            detail: {
              type: "education",
              description:
                "Approfondissement en ingénierie logicielle, conception de systèmes d'information sécurisés et intégration de technologies avancées.",
              tags: ["Génie Logiciel", "Cybersécurité", "Systèmes d'Information"],
            },
          },
        ],
      },
      {
        period: "Janv. 2025 — Oct. 2025",
        items: [
          {
            title: "Stagiaire Développeur Mobile",
            company: "PIALOA Technologie, Yaoundé",
            current: false,
            detail: {
              type: "experience",
              duration: "7 mois",
              description:
                "Conception et déploiement d'une solution d'authentification biométrique sécurisée dans un contexte d'examen. Intégration mobile, gestion de base de données et sécurité applicative.",
              tags: ["Machine Learning", "Biométrie", "Sécurité", "Flutter", "Firebase"],
            },
          },
          {
            title: "Développeur Freelance",
            company: "Application mobile — Flutter & Firebase",
            current: false,
            detail: {
              type: "experience",
              duration: "2 mois",
              description:
                "Application mobile multiplateforme de petites annonces avec messagerie en temps réel et authentification sécurisée.",
              tags: ["Flutter", "Firebase", "Dart", "Real-time"],
            },
          },
        ],
      },
      {
        period: "Sept. 2024 — Présent",
        items: [
          {
            title: "Professeur particulier en Informatique",
            company: "Mme CHRISTELLE Alatsa",
            current: true,
            detail: {
              type: "experience",
              description:
                "Encadrement et suivi d'élèves de classe de première et terminale série TI au collège François Xavier Vogt.",
              tags: ["Sécurité informatique", "Maintenance", "Programmation", "Réseaux"],
            },
          },
        ],
      },
      {
        period: "Sept. 2022 — Juil. 2025",
        items: [
          {
            title: "Licence Professionnelle en Informatique",
            company: "Université de Yaoundé I — Spé. Cybersécurité",
            current: false,
            detail: {
              type: "education",
              description:
                "L3 : Cryptographie, audit de vulnérabilités, administration sécurisée. L2 : Développement logiciel, bases de données, réseaux. L1 : Algorithmique, programmation, mathématiques appliquées.",
              tags: ["Cybersécurité", "Cryptographie", "Développement", "Réseaux"],
            },
          },
        ],
      },
    ],
    extraTimeline: [
      {
        period: "Session 2022",
        items: [
          {
            title: "Baccalauréat — Série C",
            company: "Lycée NSAM-EFOULAN, Yaoundé",
            current: false,
            detail: {
              type: "education",
              description:
                "Baccalauréat de l'Enseignement Secondaire Général. Série C : Mathématiques, Physique-Chimie. Session 2022, Lycée de NSAM-EFOULAN.",
              stats: [
                { label: "Moyenne", value: "10,78 / 20" },
                { label: "Mention", value: "Passable" },
                { label: "Jury N°", value: "332" },
              ],
              tags: ["Mathématiques", "Physique-Chimie", "Informatique"],
            },
          },
        ],
      },
      {
        period: "Session 2021",
        items: [
          {
            title: "Probatoire — Série C",
            company: "Lycée NSAM-EFOULAN, Yaoundé",
            current: false,
            detail: {
              type: "education",
              description:
                "Probatoire de l'Enseignement Secondaire Général. Série C : Mathématiques, Physique-Chimie. Session 2021.",
              stats: [
                { label: "Moyenne", value: "10,75 / 20" },
                { label: "Mention", value: "Admis" },
                { label: "Total", value: "301 / 28 coefs" },
              ],
              tags: ["Mathématiques", "Physique-Chimie", "Sciences"],
            },
          },
        ],
      },
      {
        period: "Session 2019",
        items: [
          {
            title: "BEPC — Premier Cycle",
            company: "Lycée NSAM-EFOULAN, Yaoundé",
            current: false,
            detail: {
              type: "education",
              description:
                "Brevet d'Études du Premier Cycle. Points forts : Mathématiques (56/80), Éducation Citoyenneté (34/40), Éducation Physique (34/40), Expression Écrite (24/40).",
              stats: [
                { label: "Moyenne", value: "11,88 / 20" },
                { label: "Total", value: "297 / 500" },
                { label: "Mention", value: "Passable" },
              ],
              tags: ["Mathématiques", "Sciences", "Premier Cycle"],
            },
          },
        ],
      },
    ],
  },
  services: {
    badge: "Services",
    heading: "Mes spécialisations",
    counts: {
      smartphone: "2 PROJETS",
      globe: "2 PROJETS",
      monitor: "Études & Formation",
      shield: "Études & Stage",
    },
    items: [
      {
        title: "Développement Mobile",
        description:
          "Applications iOS et Android performantes avec Flutter. Authentification sécurisée, messagerie temps réel, expériences natives multiplateformes.",
      },
      {
        title: "Développement Web",
        description:
          "Sites web et applications web modernes avec React, Next.js et Laravel. Interfaces responsives, SEO-friendly et haute performance.",
      },
      {
        title: "Développement Desktop",
        description:
          "Applications desktop robustes avec C# et .NET. Interfaces riches WPF/WinForms, gestion de base de données et intégration système Windows.",
      },
      {
        title: "Cybersécurité",
        description:
          "Audit de vulnérabilités, chiffrement, tests de pénétration et sécurisation d'applications. Expertise en cryptographie et administration sécurisée des systèmes.",
      },
    ],
  },
  skills: {
    badge: "Mes Compétences",
    heading: "Mes avantages",
    alsoMastered: "Également maîtrisé",
    secondarySkills: [
      "Dart", "Java", "C#", "HTML / CSS", "SQLite",
      "Entity Framework", "MSFVenom", "VMware", "Windows Server",
      "Android Studio", "IntelliJ IDEA",
    ],
  },
  projects: {
    badge: "Portfolio",
    heading: "Mes projets réalisés",
    filters: [
      { key: "all", label: "Tous" },
      { key: "web", label: "Web" },
      { key: "mobile", label: "Mobile" },
      { key: "security", label: "Sécurité" },
    ],
    viewProject: "Voir le projet",
    sourceCode: "Code source",
    viewGithub: "Voir tous mes projets sur GitHub →",
    items: [
      {
        id: 1,
        title: "Portfolio Laravel",
        description:
          "Portfolio professionnel responsive avec Laravel, interface d'administration pour la gestion du contenu, système de projet intégré et service de messagerie.",
      },
      {
        id: 2,
        title: "App Petites Annonces",
        description:
          "Application mobile multiplateforme de petites annonces avec système de messagerie en temps réel et authentification sécurisée.",
      },
      {
        id: 3,
        title: "Authentification Biométrique",
        description:
          "Solution d'authentification biométrique sécurisée pour application mobile. Intégration native, gestion de base de données et sécurité applicative.",
      },
    ],
  },
  contact: {
    badge: "Contact",
    heading: "Travaillons ensemble",
    emailLabel: "Email",
    phoneLabel: "Téléphone",
    locationLabel: "Localisation",
    socialLabel: "Réseaux sociaux",
    cvLabel: "Curriculum Vitae",
    downloadCV: "Télécharger mon CV",
    nameLabel: "Nom complet *",
    emailFieldLabel: "Email *",
    subjectLabel: "Sujet *",
    messageLabel: "Message *",
    namePlaceholder: "Votre nom",
    emailPlaceholder: "votre@email.com",
    subjectPlaceholder: "Objet de votre message",
    messagePlaceholder: "Décrivez votre projet ou demande...",
    sendButton: "Envoyer le message",
    sendingButton: "Envoi en cours...",
    sentTitle: "Message envoyé !",
    sentMessage: "Merci pour votre message. Je vous répondrai dans les plus brefs délais.",
    newMessageButton: "Nouveau message",
    errorMessage: "Une erreur s'est produite. Veuillez réessayer.",
  },
};
