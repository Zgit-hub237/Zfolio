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
    subtitleLines: ["Cybersécurité :", "analyse, pentest &", "développement", "sécurisé"],
    copyright: "© Loé Zegou 2026. Tous droits réservés",
    downloadCV: "Télécharger CV",
    contactMe: "ME CONTACTER",
  },
  hero: {
    badge: "Introduction",
    greeting: "Bonjour, je suis",
    line3: "étudiant en",
    line4: "cybersécurité",
    tagline: "J'analyse, je teste et je développe des applications sécurisées.",
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
    bio: "Étudiant en MSc Cybersecurity Management à l'ECE Paris, j'ai d'abord appris à construire des applications mobiles, web et desktop avant de me spécialiser dans leur sécurité. J'allie aujourd'hui analyse de vulnérabilités, tests d'intrusion en laboratoire et développement sécurisé : authentification, contrôle d'accès, sécurité des API. Curieux et polyvalent, je veux être utile autant côté offensif que défensif.",
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
    viewCV: "Voir le CV en ligne",
    ongoing: "En cours",
    educationLabel: "Formation",
    experienceLabel: "Expérience",
    showMore: "Voir plus — formations antérieures (BAC, Probatoire, BEPC)",
    showLess: "Voir moins",
    mainTimeline: [
      {
        period: "Nov. 2026 — Présent",
        items: [
          {
            title: "MSc Cybersecurity Management",
            company: "ECE, Paris",
            current: true,
            detail: {
              type: "education",
              description:
                "Formation spécialisée en gouvernance de la sécurité, gestion des risques cyber, conformité (ISO 27001, RGPD) et réponse aux incidents.",
              tags: ["Gouvernance", "Gestion des risques", "ISO 27001", "RGPD", "Réponse aux incidents"],
            },
          },
        ],
      },
      {
        period: "Juin 2026 — Présent",
        items: [
          {
            title: "Fondamentaux de la Sécurité API 2025",
            company: "APISec University — En ligne",
            current: true,
            detail: {
              type: "education",
              description:
                "Formation complète à la sécurité des API : pourquoi les API sont attaquées, exemples concrets de violations et Top 10 OWASP API Security. Analyse des attaques, gouvernance, tests et surveillance des API.",
              tags: ["API Security", "OWASP", "Cybersécurité", "APISec University"],
            },
          },
        ],
      },
      {
        period: "Mars 2026 — Juin 2026",
        items: [
          {
            title: "Web Développeur",
            company: "SpeDev, Yaoundé",
            current: false,
            detail: {
              type: "experience",
              duration: "3 mois",
              description:
                "Conception et développement d'applications web modernes au sein de SpeDev. Collaboration en équipe sur des projets clients variés.",
              tags: ["Next.js", "Tailwind CSS", "Web", "SpeDev"],
            },
          },
        ],
      },
      {
        period: "Janv. 2026 — Mai 2026",
        items: [
          {
            title: "Introduction à la Cybersécurité",
            company: "Cisco Networking Academy — En ligne",
            current: false,
            detail: {
              type: "education",
              duration: "5 mois",
              description:
                "Formation certifiante aux bonnes pratiques en cybersécurité : vulnérabilités réseau, confidentialité des données, détection des menaces et principes fondamentaux de la sécurité informatique.",
              tags: ["Cybersécurité", "Réseaux", "Détection des menaces", "Cisco"],
              credlyBadgeId: "319af8d9-1563-44af-8618-0347b98a0168",
              certificateUrl: "/cv/CERTIFICAT_CISCO_NETWORKING_ACADEMY_INTRODUCTION_A_LA_CYBERSECURITE.pdf",
            },
          },
        ],
      },
      {
        period: "Oct. 2025 — Juil. 2026",
        items: [
          {
            title: "Master I — Système d'Information & Génie Logiciel",
            company: "Université de Yaoundé I",
            current: false,
            detail: {
              type: "education",
              duration: "Juil. 2026 (Validé)",
              description:
                "Master I validé en Juillet 2026. Approfondissement en ingénierie logicielle, conception de systèmes d'information sécurisés et intégration de technologies avancées.",
              tags: ["Master I Validé", "Génie Logiciel", "Cybersécurité", "Systèmes d'Information"],
            },
          },
          {
            title: "Développeur Freelance — SGP",
            company: "Application Desktop C# / .NET",
            current: false,
            detail: {
              type: "experience",
              duration: "4 mois",
              description:
                "Développement d'une application desktop de gestion pénitentiaire. Conception et implémentation des fonctionnalités de gestion des détenus, suivi des dossiers et interface d'administration sécurisée.",
              tags: ["C#", ".NET", "WPF", "SQLite", "Desktop"],
            },
          },
          {
            title: "Développeur Flutter",
            company: "Med Prepa — Télétravail",
            current: false,
            detail: {
              type: "experience",
              duration: "5 mois",
              description:
                "Med Prepa est une application mobile de préparation au concours de médecine au Cameroun, actuellement en refonte. Développement fidèle au design, clean architecture, tests et maintenance des fonctionnalités, avec une intégration fluide entre backend et frontend. Intégration d'API, stockage local et gestion d'état.",
              tags: ["Flutter", "Dart", "Clean Architecture", "API REST", "Gestion d'état"],
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
          {
            title: "ICT4D Hackathon — 3e place",
            company: "ICT4D Hackathon, Yaoundé",
            current: false,
            detail: {
              type: "experience",
              duration: "Avr. 2025 — 24 h",
              description:
                "Développement en équipe, en 24 h non-stop, de SchoolAccess, une plateforme mobile rendant les manuels scolaires accessibles en plusieurs langues. Équipe classée 3e du podium.",
              tags: ["Hackathon", "Mobile", "Travail d'équipe", "Podium"],
            },
          },
        ],
      },
      {
        period: "Sept. 2024 — Nov. 2026",
        items: [
          {
            title: "Professeur particulier",
            company: "Cours particuliers, Yaoundé",
            current: false,
            detail: {
              type: "experience",
              duration: "2 ans",
              description:
                "Suivi de 3 élèves de première et terminale (séries C et TI) pendant 2 ans en informatique, mathématiques et physique.",
              tags: ["Informatique", "Mathématiques", "Physique", "Pédagogie"],
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
                "Spécialisation : cryptographie, audit de vulnérabilités, administration sécurisée et gestion de projets de cybersécurité. Compétences clés : développement logiciel, bases de données, réseaux et sécurité des systèmes. Fondamentaux : algorithmique, programmation, systèmes d'information et mathématiques appliquées.",
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
      shield: "Formation & labos",
      globe: "3 PROJETS",
      smartphone: "2 PROJETS",
      monitor: "1 PROJET",
    },
    items: [
      {
        title: "Analyse & tests d'intrusion",
        description:
          "Audit de vulnérabilités et tests d'intrusion en laboratoire avec Kali Linux, Metasploitable et MSFVenom. Analyse des risques, cryptographie et sécurisation des systèmes.",
      },
      {
        title: "Développement web sécurisé",
        description:
          "Applications et API web avec React, Next.js et Node.js, pensées pour la sécurité dès la conception : authentification JWT, contrôle d'accès par rôles, bonnes pratiques OWASP.",
      },
      {
        title: "Développement mobile",
        description:
          "Applications Flutter multiplateformes : authentification biométrique, messagerie temps réel, clean architecture et intégration d'API.",
      },
      {
        title: "Développement desktop",
        description:
          "Applications desktop robustes avec C# et .NET : interfaces WPF, gestion de base de données et authentification des utilisateurs.",
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
      "Android Studio", "IntelliJ IDEA", "C++", "Metasploitable",
      "GitHub", "VS Code",
    ],
  },
  projects: {
    badge: "Portfolio",
    heading: "Mes projets réalisés",
    filters: [
      { key: "all", label: "Tous" },
      { key: "web", label: "Web" },
      { key: "mobile", label: "Mobile" },
      { key: "desktop", label: "Desktop" },
      { key: "security", label: "Sécurité" },
    ],
    viewProject: "Voir le projet",
    sourceCode: "Code source",
    viewGithub: "Voir tous mes projets sur GitHub →",
    items: [
      {
        id: 1,
        title: "Portfolio Next.js",
        description:
          "Portfolio professionnel bilingue et responsive avec Next.js : CV en ligne imprimable, système de projets intégré et formulaire de contact.",
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
      {
        id: 6,
        title: "SGP — Gestion Pénitentiaire",
        description:
          "Application desktop de gestion pénitentiaire avec authentification, gestion des détenus et suivi des dossiers. Interface WPF moderne et base de données SQLite.",
      },
      {
        id: 4,
        title: "Propelize",
        description:
          "Système complet de gestion des véhicules avec authentification JWT, autorisation par rôles et interface web responsive. Tests automatisés Playwright et documentation Swagger/OpenAPI.",
      },
      {
        id: 5,
        title: "Dataflow Testing",
        description:
          "Démonstration des méthodologies de couverture de flux de données : All-Defs, All-Uses et All-DU-Paths. Comparatif entre tests complets (100% de couverture) et tests incomplets.",
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
