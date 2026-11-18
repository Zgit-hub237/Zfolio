import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { ExternalLink } from "lucide-react";
import { getDb } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { btnGhost, Card, Flash, Input, PageHeader, Select, Textarea } from "@/components/admin/fields";
import { DeleteButton, SubmitButton } from "@/components/admin/buttons";
import MediaInput from "@/components/admin/MediaInput";
import MarkdownEditor from "@/components/admin/MarkdownEditor";
import type { SearchParams } from "@/lib/admin/util";
import { deletePost, savePost } from "../actions";

const toLocalInput = (d: Date | null) => (d ? new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16) : "");

export default async function EditPost({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: SearchParams }) {
  const { id } = await params;
  const sp = await searchParams;
  const isNew = id === "new";
  const db = await getDb();
  const post = !isNew && db ? (await db.select().from(posts).where(eq(posts.id, Number(id))).limit(1))[0] : null;
  if (!isNew && !post) notFound();
  const useBlob = Boolean(process.env.BLOB_READ_WRITE_TOKEN);

  return (
    <>
      <PageHeader
        title={isNew ? "Nouvel article" : post!.title}
        actions={
          <>
            {post?.status === "published" && (
              <a href={`/blog/${post.slug}`} target="_blank" className={btnGhost}><ExternalLink size={14} /> Voir</a>
            )}
            <Link href="/admin/blog" className={btnGhost}>← Retour</Link>
          </>
        }
      />
      <Flash {...sp} />
      <form action={savePost} className="grid gap-5 xl:grid-cols-[1fr_300px] items-start">
        <input type="hidden" name="id" value={isNew ? "new" : post!.id} />
        <div className="space-y-5 min-w-0">
          <Card>
            <Input name="title" label="Titre" defaultValue={post?.title} required />
            <Textarea name="excerpt" label="Chapeau / résumé" defaultValue={post?.excerpt} rows={2} hint="Affiché dans les listes et pour le référencement." />
            <MarkdownEditor name="content" defaultValue={post?.content ?? ""} useBlob={useBlob} />
          </Card>
        </div>
        <div className="space-y-5">
          <Card title="Publication">
            <Select
              name="status"
              label="Statut"
              defaultValue={post?.status ?? "draft"}
              options={[
                { value: "draft", label: "Brouillon" },
                { value: "published", label: "Publié" },
              ]}
            />
            <Input name="publishedAt" label="Date de publication" type="datetime-local" defaultValue={toLocalInput(post?.publishedAt ?? null)} hint="Vide = maintenant. Une date future programme l'article." />
            <Select
              name="lang"
              label="Langue"
              defaultValue={post?.lang ?? "fr"}
              options={[
                { value: "fr", label: "Français" },
                { value: "en", label: "English" },
              ]}
            />
            <Input name="slug" label="Adresse (slug)" defaultValue={post?.slug} hint="Vide = générée à partir du titre." />
            <Input name="tags" label="Tags" defaultValue={post?.tags.join(", ")} hint="Séparés par des virgules." />
            <SubmitButton />
          </Card>
          <Card title="Médias">
            <MediaInput name="coverImage" label="Image de couverture" defaultValue={post?.coverImage} useBlob={useBlob} />
            <MediaInput name="videoUrl" label="Vidéo (vlog)" defaultValue={post?.videoUrl} useBlob={useBlob} accept="video/mp4,video/webm" hint="Lien YouTube / Vimeo, ou fichier MP4/WebM." />
          </Card>
        </div>
      </form>
      {!isNew && (
        <div className="mt-6 flex justify-end">
          <DeleteButton action={deletePost} id={post!.id} confirmText="Supprimer définitivement cet article ?" />
        </div>
      )}
    </>
  );
}
