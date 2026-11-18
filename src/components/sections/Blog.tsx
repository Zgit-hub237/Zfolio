"use client";

import Link from "next/link";
import { PenSquare, PlayCircle, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import SectionBadge from "@/components/SectionBadge";
import RevealText from "@/components/ui/RevealText";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { useT } from "@/contexts/LangContext";
import { useSite } from "@/contexts/SiteContext";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Blog() {
  const { t, lang } = useT();
  const { posts } = useSite();

  const formatDate = (iso: string | null) =>
    iso
      ? new Date(iso).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-GB", { day: "numeric", month: "long", year: "numeric" })
      : "";

  return (
    <section id="blog" className="min-h-[70vh] flex flex-col justify-center px-5 sm:px-8 lg:px-16 py-14 sm:py-20 bg-dark">
      <div className="max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease }}
        >
          <SectionBadge icon={PenSquare} label={t.blog.badge} />
          <RevealText as="h2" className="section-heading mb-4">
            {t.blog.heading.split(" ").slice(0, -1).join(" ")}<br />
            <span className="gradient-text">{t.blog.heading.split(" ").slice(-1)[0]}</span>
          </RevealText>
          <p className="text-muted text-sm sm:text-base max-w-xl mb-10">{t.blog.intro}</p>
        </motion.div>

        {posts.length === 0 ? (
          <p className="text-muted text-sm">{t.blog.empty}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {posts.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease }}
              >
                <Link href={`/blog/${post.slug}`} className="block h-full group">
                  <SpotlightCard className="h-full flex flex-col border border-dark-4 bg-dark-2 rounded-2xl overflow-hidden hover:border-accent/30 transition-colors">
                    <div className="relative h-40 bg-gradient-to-br from-accent/15 via-dark-3 to-accent-2/15 overflow-hidden">
                      {post.coverImage && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={post.coverImage} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      )}
                      {post.videoUrl && (
                        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-dark/80 backdrop-blur text-[11px] font-semibold text-accent">
                          <PlayCircle size={13} /> {t.blog.video}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col flex-1 p-5">
                      <div className="flex items-center gap-2 text-[11px] text-muted uppercase tracking-widest mb-2">
                        <span>{formatDate(post.publishedAt)}</span>
                        {post.lang !== lang && <span className="px-1.5 rounded bg-dark-4 normal-case tracking-normal">{post.lang.toUpperCase()}</span>}
                      </div>
                      <h3 className="text-foreground font-semibold text-base mb-2 group-hover:text-accent transition-colors">{post.title}</h3>
                      <p className="text-muted text-sm leading-relaxed line-clamp-3 flex-1">{post.excerpt}</p>
                      <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-accent">
                        {t.blog.readMore} <ArrowUpRight size={13} />
                      </span>
                    </div>
                  </SpotlightCard>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-10">
          <Link href="/blog" className="text-sm text-muted hover:text-accent transition-colors">
            {t.blog.viewAll}
          </Link>
        </div>
      </div>
    </section>
  );
}
