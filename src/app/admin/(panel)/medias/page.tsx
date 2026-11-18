import { desc } from "drizzle-orm";
import { FileText, Film } from "lucide-react";
import { getDb } from "@/lib/db";
import { media } from "@/lib/db/schema";
import { Flash, PageHeader } from "@/components/admin/fields";
import { DeleteButton } from "@/components/admin/buttons";
import CopyButton from "@/components/admin/CopyButton";
import type { SearchParams } from "@/lib/admin/util";
import UploadZone from "./UploadZone";
import { deleteMedia } from "./actions";

const size = (n: number) => (n > 1_048_576 ? `${(n / 1_048_576).toFixed(1)} Mo` : `${Math.max(1, Math.round(n / 1024))} Ko`);

export default async function MediasPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const db = await getDb();
  const rows = db ? await db.select().from(media).orderBy(desc(media.createdAt)) : [];
  const useBlob = Boolean(process.env.BLOB_READ_WRITE_TOKEN);

  return (
    <>
      <PageHeader
        title="Médias"
        description="Téléverse tes images, vidéos et PDF, puis copie leur lien pour les utiliser dans un article, un projet ou ton profil."
      />
      <Flash {...sp} />
      {!useBlob && (
        <p className="mb-4 text-xs text-muted">
          Mode local : les fichiers sont enregistrés dans <code>public/uploads</code>. En production, configure Vercel Blob.
        </p>
      )}
      <UploadZone useBlob={useBlob} />

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {rows.map((m) => (
          <div key={m.id} className="rounded-2xl border border-dark-4 bg-dark-2 overflow-hidden">
            <div className="h-36 bg-dark-3 flex items-center justify-center">
              {m.contentType.startsWith("image/") ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={m.url} alt="" className="w-full h-full object-cover" loading="lazy" />
              ) : m.contentType.startsWith("video/") ? (
                <Film className="text-muted" size={32} />
              ) : (
                <FileText className="text-muted" size={32} />
              )}
            </div>
            <div className="p-3 space-y-2">
              <p className="text-xs text-foreground truncate" title={m.pathname}>{m.pathname.split("/").pop()}</p>
              <p className="text-[11px] text-muted">{m.contentType} · {size(m.size)}</p>
              <div className="flex gap-2">
                <CopyButton value={m.url} />
                <DeleteButton action={deleteMedia} id={m.id} confirmText="Supprimer ce fichier ? Les pages qui l'utilisent n'afficheront plus l'image." />
              </div>
            </div>
          </div>
        ))}
        {rows.length === 0 && <p className="text-sm text-muted">Aucun fichier pour l&apos;instant.</p>}
      </div>
    </>
  );
}
