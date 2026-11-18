import Link from "next/link";
import { desc } from "drizzle-orm";
import { Plus } from "lucide-react";
import { getDb } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { btnPrimary, Flash, PageHeader } from "@/components/admin/fields";
import ListTable from "@/components/admin/ListTable";
import type { SearchParams } from "@/lib/admin/util";

export default async function BlogAdmin({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const db = await getDb();
  const rows = db ? await db.select().from(posts).orderBy(desc(posts.updatedAt)) : [];

  return (
    <>
      <PageHeader
        title="Blog & vlog"
        description="Articles en Markdown, avec image de couverture et vidéo (YouTube, Vimeo ou fichier téléversé)."
        actions={<Link href="/admin/blog/new" className={btnPrimary}><Plus size={15} /> Nouvel article</Link>}
      />
      <Flash {...sp} />
      <ListTable
        basePath="/admin/blog"
        empty="Aucun article. Crée le premier !"
        rows={rows.map((p) => ({
          id: p.id,
          title: p.title,
          meta: `${p.publishedAt ? p.publishedAt.toLocaleDateString("fr-FR") : "non publié"} · /blog/${p.slug}`,
          muted: p.status !== "published",
          badges: [p.status === "published" ? "publié" : "brouillon", p.lang, p.videoUrl ? "vidéo" : ""].filter(Boolean),
        }))}
      />
    </>
  );
}
