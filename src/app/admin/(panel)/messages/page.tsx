import { desc } from "drizzle-orm";
import { Mail, MailOpen, Reply } from "lucide-react";
import { getDb } from "@/lib/db";
import { messages } from "@/lib/db/schema";
import { btnGhost, Flash, PageHeader } from "@/components/admin/fields";
import { DeleteButton } from "@/components/admin/buttons";
import type { SearchParams } from "@/lib/admin/util";
import { deleteMessage, toggleRead } from "./actions";

export default async function MessagesPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const db = await getDb();
  const rows = db ? await db.select().from(messages).orderBy(desc(messages.createdAt)).limit(200) : [];

  return (
    <>
      <PageHeader title="Messages" description="Messages reçus via le formulaire de contact du site." />
      <Flash {...sp} />
      {rows.length === 0 && <p className="text-sm text-muted">Aucun message pour l&apos;instant.</p>}
      <div className="space-y-3">
        {rows.map((m) => (
          <article key={m.id} className={`rounded-2xl border bg-dark-2 p-5 ${m.read ? "border-dark-4" : "border-accent/40"}`}>
            <header className="flex flex-wrap items-start justify-between gap-3 mb-3">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {!m.read && <span className="inline-block w-2 h-2 rounded-full bg-accent mr-2 align-middle" />}
                  {m.subject}
                </p>
                <p className="text-xs text-muted">
                  {m.name} · {m.email} · {m.createdAt.toLocaleString("fr-FR")}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <a href={`mailto:${encodeURIComponent(m.email)}?subject=${encodeURIComponent(`Re: ${m.subject}`)}`} className={btnGhost}>
                  <Reply size={14} /> Répondre
                </a>
                <form action={toggleRead}>
                  <input type="hidden" name="id" value={m.id} />
                  <input type="hidden" name="read" value={String(!m.read)} />
                  <button type="submit" className={btnGhost}>
                    {m.read ? <Mail size={14} /> : <MailOpen size={14} />} {m.read ? "Non lu" : "Lu"}
                  </button>
                </form>
                <DeleteButton action={deleteMessage} id={m.id} confirmText="Supprimer ce message ?" />
              </div>
            </header>
            <p className="text-sm text-muted whitespace-pre-wrap leading-relaxed">{m.message}</p>
          </article>
        ))}
      </div>
    </>
  );
}
