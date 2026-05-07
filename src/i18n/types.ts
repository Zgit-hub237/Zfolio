export type Stat = { label: string; value: string };

export type ItemDetail = {
  type: "education" | "experience";
  description: string;
  duration?: string;
  stats?: Stat[];
  tags: string[];
};

export type TimelineItemData = {
  title: string;
  company: string;
  current: boolean;
  detail: ItemDetail;
};

export type TimelineGroupData = {
  period: string;
  items: TimelineItemData[];
};

export interface Translations {
  nav: {
    home: string;
    about: string;
    resume: string;
    services: string;
    skills: string;
    projects: string;
    contact: string;
    menu: string;
  };
  sidebar: {
    subtitleLines: string[];
    copyright: string;
    downloadCV: string;
    contactMe: string;
  };
  hero: {
    badge: string;
    greeting: string;
    line3: string;
    line4: string;
    tagline: string;
    yearsStudy: string;
    proExp: string;
    circularText: string;
  };
  about: {
    badge: string;
    heading1: string;
    heading2: string;
    heading3: string;
    heading4: string;
    bio: string;
    strengths: string[];
  };
  resume: {
    badge: string;
    heading1: string;
    heading2: string;
    downloadCV: string;
    ongoing: string;
    educationLabel: string;
    experienceLabel: string;
    showMore: string;
    showLess: string;
    mainTimeline: TimelineGroupData[];
    extraTimeline: TimelineGroupData[];
  };
  services: {
    badge: string;
    heading: string;
    counts: Record<string, string>;
    items: Array<{ title: string; description: string }>;
  };
  skills: {
    badge: string;
    heading: string;
    alsoMastered: string;
    secondarySkills: string[];
  };
  projects: {
    badge: string;
    heading: string;
    filters: Array<{ key: string; label: string }>;
    viewProject: string;
    sourceCode: string;
    viewGithub: string;
    items: Array<{ id: number; title: string; description: string }>;
  };
  contact: {
    badge: string;
    heading: string;
    emailLabel: string;
    phoneLabel: string;
    locationLabel: string;
    socialLabel: string;
    cvLabel: string;
    downloadCV: string;
    nameLabel: string;
    emailFieldLabel: string;
    subjectLabel: string;
    messageLabel: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    subjectPlaceholder: string;
    messagePlaceholder: string;
    sendButton: string;
    sendingButton: string;
    sentTitle: string;
    sentMessage: string;
    newMessageButton: string;
    errorMessage: string;
  };
}
