import type { Translations } from "./types";

export const en: Translations = {
  nav: {
    home: "Home",
    about: "About",
    resume: "Resume",
    services: "Services",
    skills: "Skills",
    projects: "Portfolio",
    contact: "Contact",
    menu: "Menu",
  },
  sidebar: {
    subtitleLines: ["Cybersecurity:", "analysis, pentest &", "secure", "development"],
    copyright: "© Loé Zegou 2026. All rights reserved",
    downloadCV: "Download CV",
    contactMe: "CONTACT ME",
  },
  hero: {
    badge: "Introduction",
    greeting: "Hello, I'm",
    line3: "a cybersecurity",
    line4: "student",
    tagline: "I analyze, test and build secure applications.",
    yearsStudy: "Years of study",
    proExp: "Pro Experience",
    circularText: "MY PROJECTS • MY PROJECTS •",
  },
  about: {
    badge: "About",
    heading1: "Every great digital",
    heading2: "solution begins with",
    heading3: "an even",
    heading4: "better story",
    bio: "MSc Cybersecurity Management student at ECE Paris, I first learned to build mobile, web and desktop applications before specializing in their security. Today I combine vulnerability analysis, lab penetration testing and secure development: authentication, access control, API security. Curious and versatile, I want to be useful on both the offensive and defensive sides.",
    strengths: [
      "Creativity",
      "Adaptability",
      "Passion for technological innovation",
      "Analytical and methodical mindset",
    ],
  },
  resume: {
    badge: "Resume",
    heading1: "Education &",
    heading2: "Experience",
    downloadCV: "Download my CV",
    viewCV: "View resume online",
    ongoing: "Ongoing",
    educationLabel: "Education",
    experienceLabel: "Experience",
    showMore: "Show more — previous education (Bac, Probatoire, BEPC)",
    showLess: "Show less",
    mainTimeline: [
      {
        period: "Nov. 2026 — Present",
        items: [
          {
            title: "MSc Cybersecurity Management",
            company: "ECE, Paris",
            current: true,
            detail: {
              type: "education",
              description:
                "Specialized program in security governance, cyber risk management, compliance (ISO 27001, GDPR) and incident response.",
              tags: ["Governance", "Risk Management", "ISO 27001", "GDPR", "Incident Response"],
            },
          },
        ],
      },
      {
        period: "June 2026 — Present",
        items: [
          {
            title: "API Security Fundamentals 2025",
            company: "APISec University — Online",
            current: true,
            detail: {
              type: "education",
              description:
                "Comprehensive introduction to API security: why APIs are attacked, real-world breach examples and OWASP API Security Top 10. Attack analysis, governance, testing and monitoring of APIs.",
              tags: ["API Security", "OWASP", "Cybersecurity", "APISec University"],
            },
          },
        ],
      },
      {
        period: "March 2026 — June 2026",
        items: [
          {
            title: "Web Developer",
            company: "SpeDev, Yaoundé",
            current: false,
            detail: {
              type: "experience",
              duration: "3 months",
              description:
                "Design and development of modern web applications within SpeDev. Team collaboration on various client projects.",
              tags: ["Next.js", "Tailwind CSS", "Web", "SpeDev"],
            },
          },
        ],
      },
      {
        period: "Jan. 2026 — May 2026",
        items: [
          {
            title: "Introduction to Cybersecurity",
            company: "Cisco Networking Academy — Online",
            current: false,
            detail: {
              type: "education",
              duration: "5 months",
              description:
                "Certified training in cybersecurity best practices: network vulnerabilities, data privacy, threat detection and fundamental principles of computer security.",
              tags: ["Cybersecurity", "Networks", "Threat Detection", "Cisco"],
              credlyBadgeId: "319af8d9-1563-44af-8618-0347b98a0168",
              certificateUrl: "/cv/CERTIFICAT_CISCO_NETWORKING_ACADEMY_INTRODUCTION_A_LA_CYBERSECURITE.pdf",
            },
          },
        ],
      },
      {
        period: "Oct. 2025 — Jul. 2026",
        items: [
          {
            title: "Master I — Information Systems & Software Engineering",
            company: "University of Yaoundé I",
            current: false,
            detail: {
              type: "education",
              duration: "Jul. 2026 (Completed)",
              description:
                "Master I completed in July 2026. In-depth study of software engineering, design of secure information systems and integration of advanced technologies.",
              tags: ["Master I Completed", "Software Engineering", "Cybersecurity", "Information Systems"],
            },
          },
          {
            title: "Freelance Developer — SGP",
            company: "Desktop Application C# / .NET",
            current: false,
            detail: {
              type: "experience",
              duration: "4 months",
              description:
                "Development of a desktop prison management application. Design and implementation of inmate management features, case tracking and secure administration interface.",
              tags: ["C#", ".NET", "WPF", "SQLite", "Desktop"],
            },
          },
          {
            title: "Flutter Developer",
            company: "Med Prepa — Remote",
            current: false,
            detail: {
              type: "experience",
              duration: "5 months",
              description:
                "Med Prepa is a mobile app that helps students prepare for the medical school entrance exam in Cameroon, currently being redesigned. Pixel-faithful development, clean architecture, testing and feature maintenance, with smooth backend–frontend integration. API integration, local storage and state management.",
              tags: ["Flutter", "Dart", "Clean Architecture", "REST API", "State Management"],
            },
          },
        ],
      },
      {
        period: "Jan. 2025 — Oct. 2025",
        items: [
          {
            title: "Mobile Developer Intern",
            company: "PIALOA Technologie, Yaoundé",
            current: false,
            detail: {
              type: "experience",
              duration: "7 months",
              description:
                "Design and deployment of a secure biometric authentication solution for an examination context. Mobile integration, database management and application security.",
              tags: ["Machine Learning", "Biometrics", "Security", "Flutter", "Firebase"],
            },
          },
          {
            title: "Freelance Developer",
            company: "Mobile App — Flutter & Firebase",
            current: false,
            detail: {
              type: "experience",
              duration: "2 months",
              description:
                "Cross-platform mobile classifieds application with real-time messaging and secure authentication.",
              tags: ["Flutter", "Firebase", "Dart", "Real-time"],
            },
          },
          {
            title: "ICT4D Hackathon — 3rd place",
            company: "ICT4D Hackathon, Yaoundé",
            current: false,
            detail: {
              type: "experience",
              duration: "Apr. 2025 — 24 h",
              description:
                "Team development, in 24 hours non-stop, of SchoolAccess, a mobile platform making school textbooks accessible in several languages. Team finished 3rd on the podium.",
              tags: ["Hackathon", "Mobile", "Teamwork", "Podium"],
            },
          },
        ],
      },
      {
        period: "Sept. 2024 — Nov. 2026",
        items: [
          {
            title: "Private Tutor",
            company: "Private lessons, Yaoundé",
            current: false,
            detail: {
              type: "experience",
              duration: "2 years",
              description:
                "Tutored 3 upper secondary students (C and TI series) over 2 years in computer science, mathematics and physics.",
              tags: ["Computer Science", "Mathematics", "Physics", "Teaching"],
            },
          },
        ],
      },
      {
        period: "Sept. 2022 — Jul. 2025",
        items: [
          {
            title: "Professional Bachelor in Computer Science",
            company: "University of Yaoundé I — Cybersecurity Specialization",
            current: false,
            detail: {
              type: "education",
              description:
                "Specialization: cryptography, vulnerability auditing, secure administration and cybersecurity project management. Key skills: software development, databases, networks and systems security. Fundamentals: algorithms, programming, information systems and applied mathematics.",
              tags: ["Cybersecurity", "Cryptography", "Development", "Networks"],
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
            title: "Baccalauréat — Series C",
            company: "Lycée NSAM-EFOULAN, Yaoundé",
            current: false,
            detail: {
              type: "education",
              description:
                "General Secondary Education Baccalauréat. Series C: Mathematics, Physics-Chemistry. Session 2022, Lycée NSAM-EFOULAN.",
              stats: [
                { label: "Average", value: "10.78 / 20" },
                { label: "Grade", value: "Pass" },
                { label: "Jury N°", value: "332" },
              ],
              tags: ["Mathematics", "Physics-Chemistry", "Computer Science"],
            },
          },
        ],
      },
      {
        period: "Session 2021",
        items: [
          {
            title: "Probatoire — Series C",
            company: "Lycée NSAM-EFOULAN, Yaoundé",
            current: false,
            detail: {
              type: "education",
              description:
                "General Secondary Education Probatoire. Series C: Mathematics, Physics-Chemistry. Session 2021.",
              stats: [
                { label: "Average", value: "10.75 / 20" },
                { label: "Grade", value: "Passed" },
                { label: "Total", value: "301 / 28 coefs" },
              ],
              tags: ["Mathematics", "Physics-Chemistry", "Sciences"],
            },
          },
        ],
      },
      {
        period: "Session 2019",
        items: [
          {
            title: "BEPC — First Cycle",
            company: "Lycée NSAM-EFOULAN, Yaoundé",
            current: false,
            detail: {
              type: "education",
              description:
                "First Cycle Certificate. Strengths: Mathematics (56/80), Citizenship Education (34/40), Physical Education (34/40), Written Expression (24/40).",
              stats: [
                { label: "Average", value: "11.88 / 20" },
                { label: "Total", value: "297 / 500" },
                { label: "Grade", value: "Pass" },
              ],
              tags: ["Mathematics", "Sciences", "First Cycle"],
            },
          },
        ],
      },
    ],
  },
  services: {
    badge: "Services",
    heading: "My specializations",
    counts: {
      shield: "Training & labs",
      globe: "3 PROJECTS",
      smartphone: "2 PROJECTS",
      monitor: "1 PROJECT",
    },
    items: [
      {
        title: "Analysis & penetration testing",
        description:
          "Vulnerability auditing and lab penetration testing with Kali Linux, Metasploitable and MSFVenom. Risk analysis, cryptography and system hardening.",
      },
      {
        title: "Secure web development",
        description:
          "Web applications and APIs with React, Next.js and Node.js, built with security in mind from the start: JWT authentication, role-based access control, OWASP best practices.",
      },
      {
        title: "Mobile development",
        description:
          "Cross-platform Flutter apps: biometric authentication, real-time messaging, clean architecture and API integration.",
      },
      {
        title: "Desktop development",
        description:
          "Robust desktop applications with C# and .NET: WPF interfaces, database management and user authentication.",
      },
    ],
  },
  skills: {
    badge: "My Skills",
    heading: "My strengths",
    alsoMastered: "Also mastered",
    secondarySkills: [
      "Dart", "Java", "C#", "HTML / CSS", "SQLite",
      "Entity Framework", "MSFVenom", "VMware", "Windows Server",
      "Android Studio", "IntelliJ IDEA", "C++", "Metasploitable",
      "GitHub", "VS Code",
    ],
  },
  projects: {
    badge: "Portfolio",
    heading: "My completed projects",
    filters: [
      { key: "all", label: "All" },
      { key: "web", label: "Web" },
      { key: "mobile", label: "Mobile" },
      { key: "desktop", label: "Desktop" },
      { key: "security", label: "Security" },
    ],
    viewProject: "View project",
    sourceCode: "Source code",
    viewGithub: "View all my projects on GitHub →",
    items: [
      {
        id: 1,
        title: "Next.js Portfolio",
        description:
          "Bilingual, responsive professional portfolio built with Next.js: printable online resume, integrated project system and contact form.",
      },
      {
        id: 2,
        title: "Classifieds App",
        description:
          "Cross-platform mobile classifieds application with real-time messaging system and secure authentication.",
      },
      {
        id: 3,
        title: "Biometric Authentication",
        description:
          "Secure biometric authentication solution for mobile application. Native integration, database management and application security.",
      },
      {
        id: 6,
        title: "SGP — Prison Management",
        description:
          "Desktop prison management application with authentication, inmate management and case tracking. Modern WPF interface and SQLite database.",
      },
      {
        id: 4,
        title: "Propelize",
        description:
          "Complete vehicle management system with JWT authentication, role-based authorization and responsive web interface. Automated Playwright tests and Swagger/OpenAPI documentation.",
      },
      {
        id: 5,
        title: "Dataflow Testing",
        description:
          "Demonstration of data flow coverage methodologies: All-Defs, All-Uses and All-DU-Paths. Comparison between complete tests (100% coverage) and incomplete tests.",
      },
    ],
  },
  contact: {
    badge: "Contact",
    heading: "Let's work together",
    emailLabel: "Email",
    phoneLabel: "Phone",
    locationLabel: "Location",
    socialLabel: "Social media",
    cvLabel: "Curriculum Vitae",
    downloadCV: "Download my CV",
    nameLabel: "Full name *",
    emailFieldLabel: "Email *",
    subjectLabel: "Subject *",
    messageLabel: "Message *",
    namePlaceholder: "Your name",
    emailPlaceholder: "your@email.com",
    subjectPlaceholder: "Subject of your message",
    messagePlaceholder: "Describe your project or request...",
    sendButton: "Send message",
    sendingButton: "Sending...",
    sentTitle: "Message sent!",
    sentMessage: "Thank you for your message. I will reply as soon as possible.",
    newMessageButton: "New message",
    errorMessage: "Something went wrong. Please try again.",
  },
};
