import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, PlayCircle } from "lucide-react";
import { getPublishedPosts } from "@/lib/content/get";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Blog — Loé Zegou Megnizon",
  description: "Veille cybersécurité, write-ups de labs et retours d'expérience de Loé Zegou Megnizon.",
};

const fmt = (d: Date | null, lang: string) =>
  d ? d.toLocaleDateString(lang === "en" ? "en-GB" : "fr-FR", { day: "numeric", month: "long", year: "numeric" }) : "";

export default async function BlogIndex() {
  const posts = await getPublishedPosts();

  return (
    <div className="min-h-screen bg-dark text-foreground">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
        <Link href="/#blog" className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors mb-10">
          <ArrowLeft size={15} /> Portfolio
        </Link>

        <p className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">Blog & vlog</p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">Articles et vidéos</h1>
        <p className="text-muted max-w-2xl mb-12">
          Veille cybersécurité, write-ups de labs et retours d&apos;expérience sur mes projets de développement.
        </p>

        {posts.length === 0 ? (
          <p className="text-muted">Les premiers articles arrivent bientôt.</p>
        ) : (
          <ul className="space-y-4">
            {posts.map((post) => (
              <li key={post.id}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group grid sm:grid-cols-[180px_1fr] gap-5 p-4 rounded-2xl border border-dark-4 bg-dark-2 hover:border-accent/30 transition-colors"
                >
                  <div className="relative h-32 sm:h-full min-h-28 rounded-xl overflow-hidden bg-gradient-to-br from-accent/15 via-dark-3 to-accent-2/15">
                    {post.coverImage && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={post.coverImage} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                    )}
                    {post.videoUrl && (
                      <span className="absolute bottom-2 left-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-dark/80 text-[11px] text-accent font-semibold">
                        <PlayCircle size={12} /> Vidéo
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="text-xs text-muted mb-1">
                      {fmt(post.publishedAt, post.lang)}
                      {post.lang === "en" && " · EN"}
                    </p>
                    <h2 className="text-lg font-semibold group-hover:text-accent transition-colors mb-2">{post.title}</h2>
                    <p className="text-sm text-muted leading-relaxed line-clamp-3">{post.excerpt}</p>
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {post.tags.map((tag) => (
                          <span key={tag} className="px-2 py-0.5 rounded-md bg-dark-4 text-[11px] text-muted">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
