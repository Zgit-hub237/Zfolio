import { pgTable, serial, text, integer, boolean, jsonb, timestamp, index } from "drizzle-orm/pg-core";

/** Texte bilingue stocké en JSON : { fr, en } */
export type L = { fr: string; en: string };
export type Stat = { label: string; value: string };

/* Réglages globaux (profil, compétences du CV…) : une ligne par clé, valeur JSON */
export const settings = pgTable("settings", {
  key: text("key").primaryKey(),
  value: jsonb("value").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

/* Parcours : formations, certifications et expériences */
export const timelineItems = pgTable("timeline_items", {
  id: serial("id").primaryKey(),
  kind: text("kind").$type<"education" | "experience">().notNull(),
  title: jsonb("title").$type<L>().notNull(),
  org: jsonb("org").$type<L>().notNull(),
  place: jsonb("place").$type<L>().notNull().default({ fr: "", en: "" }),
  period: jsonb("period").$type<L>().notNull(),
  duration: jsonb("duration").$type<L>().notNull().default({ fr: "", en: "" }),
  description: jsonb("description").$type<L>().notNull(),
  cvBullets: jsonb("cv_bullets").$type<L>().notNull().default({ fr: "", en: "" }),
  tags: jsonb("tags").$type<string[]>().notNull().default([]),
  stats: jsonb("stats").$type<{ fr: Stat[]; en: Stat[] }>().notNull().default({ fr: [], en: [] }),
  current: boolean("current").notNull().default(false),
  older: boolean("older").notNull().default(false),
  certification: boolean("certification").notNull().default(false),
  credlyBadgeId: text("credly_badge_id"),
  certificateUrl: text("certificate_url"),
  showOnSite: boolean("show_on_site").notNull().default(true),
  showOnCv: boolean("show_on_cv").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: jsonb("title").$type<L>().notNull(),
  description: jsonb("description").$type<L>().notNull(),
  cvText: jsonb("cv_text").$type<L>().notNull().default({ fr: "", en: "" }),
  cvTags: text("cv_tags").notNull().default(""),
  image: text("image"),
  tags: jsonb("tags").$type<string[]>().notNull().default([]),
  category: text("category").notNull().default("web"),
  link: text("link"),
  github: text("github"),
  published: boolean("published").notNull().default(true),
  showOnCv: boolean("show_on_cv").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  icon: text("icon").notNull().default("shield"),
  title: jsonb("title").$type<L>().notNull(),
  description: jsonb("description").$type<L>().notNull(),
  count: jsonb("count").$type<L>().notNull().default({ fr: "", en: "" }),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  kind: text("kind").$type<"circle" | "secondary">().notNull().default("circle"),
  percent: integer("percent").notNull().default(70),
  logo: text("logo"),
  sortOrder: integer("sort_order").notNull().default(0),
});

/* Blog / vlog */
export const posts = pgTable(
  "posts",
  {
    id: serial("id").primaryKey(),
    slug: text("slug").notNull().unique(),
    lang: text("lang").$type<"fr" | "en">().notNull().default("fr"),
    title: text("title").notNull(),
    excerpt: text("excerpt").notNull().default(""),
    content: text("content").notNull().default(""),
    coverImage: text("cover_image"),
    videoUrl: text("video_url"),
    tags: jsonb("tags").$type<string[]>().notNull().default([]),
    status: text("status").$type<"draft" | "published">().notNull().default("draft"),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("posts_status_published_idx").on(t.status, t.publishedAt)],
);

/* Messages reçus via le formulaire de contact */
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  read: boolean("read").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

/* Fichiers téléversés (images, vidéos, PDF) */
export const media = pgTable("media", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  pathname: text("pathname").notNull(),
  contentType: text("content_type").notNull(),
  size: integer("size").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

/* Limitation de débit (connexions ratées, envois de contact) */
export const rateEvents = pgTable(
  "rate_events",
  {
    id: serial("id").primaryKey(),
    action: text("action").notNull(),
    key: text("key").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("rate_events_lookup_idx").on(t.action, t.key, t.createdAt)],
);

export type TimelineItem = typeof timelineItems.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type Service = typeof services.$inferSelect;
export type Skill = typeof skills.$inferSelect;
export type Post = typeof posts.$inferSelect;
export type Message = typeof messages.$inferSelect;
export type Media = typeof media.$inferSelect;
