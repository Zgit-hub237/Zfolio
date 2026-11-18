CREATE TABLE "media" (
	"id" serial PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"pathname" text NOT NULL,
	"content_type" text NOT NULL,
	"size" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"subject" text NOT NULL,
	"message" text NOT NULL,
	"read" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"lang" text DEFAULT 'fr' NOT NULL,
	"title" text NOT NULL,
	"excerpt" text DEFAULT '' NOT NULL,
	"content" text DEFAULT '' NOT NULL,
	"cover_image" text,
	"video_url" text,
	"tags" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"status" text DEFAULT 'draft' NOT NULL,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "posts_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" jsonb NOT NULL,
	"description" jsonb NOT NULL,
	"cv_text" jsonb DEFAULT '{"fr":"","en":""}'::jsonb NOT NULL,
	"cv_tags" text DEFAULT '' NOT NULL,
	"image" text,
	"tags" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"category" text DEFAULT 'web' NOT NULL,
	"link" text,
	"github" text,
	"published" boolean DEFAULT true NOT NULL,
	"show_on_cv" boolean DEFAULT true NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "rate_events" (
	"id" serial PRIMARY KEY NOT NULL,
	"action" text NOT NULL,
	"key" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "services" (
	"id" serial PRIMARY KEY NOT NULL,
	"icon" text DEFAULT 'shield' NOT NULL,
	"title" jsonb NOT NULL,
	"description" jsonb NOT NULL,
	"count" jsonb DEFAULT '{"fr":"","en":""}'::jsonb NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "settings" (
	"key" text PRIMARY KEY NOT NULL,
	"value" jsonb NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "skills" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"kind" text DEFAULT 'circle' NOT NULL,
	"percent" integer DEFAULT 70 NOT NULL,
	"logo" text,
	"sort_order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "timeline_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"kind" text NOT NULL,
	"title" jsonb NOT NULL,
	"org" jsonb NOT NULL,
	"place" jsonb DEFAULT '{"fr":"","en":""}'::jsonb NOT NULL,
	"period" jsonb NOT NULL,
	"duration" jsonb DEFAULT '{"fr":"","en":""}'::jsonb NOT NULL,
	"description" jsonb NOT NULL,
	"cv_bullets" jsonb DEFAULT '{"fr":"","en":""}'::jsonb NOT NULL,
	"tags" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"stats" jsonb DEFAULT '{"fr":[],"en":[]}'::jsonb NOT NULL,
	"current" boolean DEFAULT false NOT NULL,
	"older" boolean DEFAULT false NOT NULL,
	"certification" boolean DEFAULT false NOT NULL,
	"credly_badge_id" text,
	"certificate_url" text,
	"show_on_site" boolean DEFAULT true NOT NULL,
	"show_on_cv" boolean DEFAULT true NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE INDEX "posts_status_published_idx" ON "posts" USING btree ("status","published_at");--> statement-breakpoint
CREATE INDEX "rate_events_lookup_idx" ON "rate_events" USING btree ("action","key","created_at");