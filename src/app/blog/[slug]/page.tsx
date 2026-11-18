import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getPublishedPost } from "@/lib/content/get";
import Markdown from "@/components/blog/Markdown";
import VideoPlayer from "@/components/blog/VideoPlayer";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) return { title: "Article introuvable" };
  return {
    title: `${post.title} — Loé Zegou`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt?.toISOString(),
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) notFound();

  const date = post.publishedAt?.toLocaleDateString(post.lang === "en" ? "en-GB" : "fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-dark text-foreground">
      <article lang={post.lang} className="max-w-3xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors mb-10">
          <ArrowLeft size={15} /> {post.lang === "en" ? "All posts" : "Tous les articles"}
        </Link>

        <p className="text-sm text-muted mb-3">{date}</p>
        <h1 className="font-display text-3xl sm:text-5xl font-bold leading-tight mb-5">{post.title}</h1>
        {post.excerpt && <p className="text-lg text-muted leading-relaxed mb-6">{post.excerpt}</p>}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-10">
            {post.tags.map((tag) => (
              <span key={tag} className="px-2.5 py-1 rounded-lg border border-dark-4 text-xs text-muted">
                {tag}
              </span>
            ))}
          </div>
        )}

        {post.videoUrl ? (
          <div className="mb-10">
            <VideoPlayer url={post.videoUrl} title={post.title} />
          </div>
        ) : (
          post.coverImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={post.coverImage} alt="" className="w-full rounded-2xl border border-dark-4 mb-10" />
          )
        )}

        <Markdown>{post.content}</Markdown>

        <div className="mt-16 pt-8 border-t border-dark-4 flex flex-wrap gap-4 justify-between text-sm">
          <Link href="/blog" className="text-muted hover:text-accent transition-colors">
            ← {post.lang === "en" ? "All posts" : "Tous les articles"}
          </Link>
          <Link href="/#contact" className="text-accent font-semibold">
            {post.lang === "en" ? "Get in touch →" : "Me contacter →"}
          </Link>
        </div>
      </article>
    </div>
  );
}
