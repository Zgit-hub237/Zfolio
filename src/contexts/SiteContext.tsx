"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { SiteContent } from "@/lib/content/types";
import { DEFAULT_CV_PDF } from "@/lib/content/types";
import { getDefaultContent } from "@/lib/content/defaults";

export type PostSummary = {
  slug: string;
  lang: "fr" | "en";
  title: string;
  excerpt: string;
  coverImage: string | null;
  videoUrl: string | null;
  tags: string[];
  publishedAt: string | null;
};

type SiteValue = {
  site: SiteContent;
  posts: PostSummary[];
};

const SiteContext = createContext<SiteValue | null>(null);

export function SiteProvider({ site, posts, children }: SiteValue & { children: ReactNode }) {
  return <SiteContext.Provider value={{ site, posts }}>{children}</SiteContext.Provider>;
}

/** Contenu éditable du site + raccourcis pratiques pour les composants. */
export function useSite() {
  const value = useContext(SiteContext);
  const site = value?.site ?? getDefaultContent();
  const p = site.profile;
  return {
    site,
    posts: value?.posts ?? [],
    profile: p,
    personalInfo: {
      email: p.email,
      phone: p.phone,
      address: p.address,
      portfolio: p.portfolioUrl,
      social: p.social,
    },
    cvPath: p.cv.pdfUrl || DEFAULT_CV_PDF,
  };
}
