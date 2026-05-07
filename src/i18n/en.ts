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
    subtitleLines: ["Computer Science", "Student,", "Software Engineering &", "Cybersecurity"],
    copyright: "© Loé Zegou 2025. All rights reserved",
    downloadCV: "Download CV",
    contactMe: "CONTACT ME",
  },
  hero: {
    badge: "Introduction",
    greeting: "Hello, I'm",
    line3: "a passionate",
    line4: "CS student",
    tagline: "I design reliable, high-performance and secure digital solutions.",
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
    bio: "Passionate about cybersecurity, software development and emerging technologies, I demonstrate great curiosity and a keen analytical mindset. My goal is to design reliable, high-performance and secure digital solutions, while exploring new approaches to combine innovation and software quality.",
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
    ongoing: "Ongoing",
    educationLabel: "Education",
    experienceLabel: "Experience",
    showMore: "Show more — previous education (Bac, Probatoire, BEPC)",
    showLess: "Show less",
    mainTimeline: [
      {
        period: "June 2026 — Present",
        items: [
          {
            title: "Web Developer",
            company: "SpeDev, Yaoundé",
            current: true,
            detail: {
              type: "experience",
              description:
                "Design and development of modern web applications within SpeDev. Team collaboration on various client projects.",
              tags: ["Next.js", "Tailwind CSS", "Web", "SpeDev"],
            },
          },
        ],
      },
      {
        period: "Oct. 2025 — Present",
        items: [
          {
            title: "Master I — Information Systems & Software Engineering",
            company: "University of Yaoundé I",
            current: true,
            detail: {
              type: "education",
              description:
                "In-depth study of software engineering, design of secure information systems and integration of advanced technologies.",
              tags: ["Software Engineering", "Cybersecurity", "Information Systems"],
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
        ],
      },
      {
        period: "Sept. 2024 — Present",
        items: [
          {
            title: "Private Computer Science Teacher",
            company: "Mrs. CHRISTELLE Alatsa",
            current: true,
            detail: {
              type: "experience",
              description:
                "Tutoring and mentoring of upper secondary TI series students at François Xavier Vogt College.",
              tags: ["Computer Security", "Maintenance", "Programming", "Networks"],
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
                "L3: Cryptography, vulnerability auditing, secure administration. L2: Software development, databases, networks. L1: Algorithms, programming, applied mathematics.",
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
      smartphone: "2 PROJECTS",
      globe: "2 PROJECTS",
      monitor: "Studies & Training",
      shield: "Studies & Internship",
    },
    items: [
      {
        title: "Mobile Development",
        description:
          "High-performance iOS and Android applications with Flutter. Secure authentication, real-time messaging, cross-platform native experiences.",
      },
      {
        title: "Web Development",
        description:
          "Modern websites and web applications with React, Next.js and Laravel. Responsive, SEO-friendly and high-performance interfaces.",
      },
      {
        title: "Desktop Development",
        description:
          "Robust desktop applications with C# and .NET. Rich WPF/WinForms interfaces, database management and Windows system integration.",
      },
      {
        title: "Cybersecurity",
        description:
          "Vulnerability auditing, encryption, penetration testing and application hardening. Expertise in cryptography and secure system administration.",
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
      "Android Studio", "IntelliJ IDEA",
    ],
  },
  projects: {
    badge: "Portfolio",
    heading: "My completed projects",
    filters: [
      { key: "all", label: "All" },
      { key: "web", label: "Web" },
      { key: "mobile", label: "Mobile" },
      { key: "security", label: "Security" },
    ],
    viewProject: "View project",
    sourceCode: "Source code",
    viewGithub: "View all my projects on GitHub →",
    items: [
      {
        id: 1,
        title: "Laravel Portfolio",
        description:
          "Professional responsive portfolio with Laravel, admin interface for content management, integrated project system and messaging service.",
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
