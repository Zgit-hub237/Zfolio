import Link from "next/link";
import { count, desc, eq } from "drizzle-orm";
import { CheckCircle2, CircleAlert, FileText, FolderKanban, GraduationCap, Mail, PenSquare } from "lucide-react";
import { getDb } from "@/lib/db";
import { messages, posts, projects, timelineItems } from "@/lib/db/schema";
import { totpEnabled } from "@/lib/auth";
import { PageHeader } from "@/components/admin/fields";

export default async function AdminHome() {
  const db = await getDb();
  const n = async (q: Promise<{ n: number }[]>) => Number((await q)[0]?.n ?? 0);

  const stats = db
    ? {
        posts: await n(db.select({ n: count() }).from(posts).where(eq(posts.status, "published"))),
        drafts: await n(db.select({ n: count() }).from(posts).where(eq(posts.status, "draft"))),
        projects: await n(db.select({ n: count() }).from(projects)),
        timeline: await n(db.select({ n: count() }).from(timelineItems)),
        unread: await n(db.select({ n: count() }).from(messages).where(eq(messages.read, false))),
      }
    : null;
  const recent = db ? await db.select().from(messages).orderBy(desc(messages.createdAt)).limit(5) : [];

  const checks = [
    { ok: Boolean(process.env.DATABASE_URL), label: "Base de données Neon", hint: process.env.DATABASE_URL ? "Connectée" : "Base locale de développement (PGlite)" },
    { ok: Boolean(process.env.BLOB_READ_WRITE_TOKEN), label: "Stockage des fichiers (Vercel Blob)", hint: process.env.BLOB_READ_WRITE_TOKEN ? "Actif" : "Fichiers enregistrés en local" },
    { ok: Boolean(process.env.RESEND_API_KEY), label: "Notification e-mail des messages (Resend)", hint: process.env.RESEND_API_KEY ? "Actif" : "Messages visibles uniquement ici" },
    { ok: totpEnabled(), label: "Double authentification (2FA)", hint: totpEnabled() ? "Activée" : "Recommandée : npm run admin:2fa" },
  ];

  const cards = stats
    ? [
        { href: "/admin/blog", label: "Articles publiés", value: stats.posts, sub: `${stats.drafts} brouillon(s)`, icon: PenSquare },
        { href: "/admin/projets", label: "Projets", value: stats.projects, icon: FolderKanban },
        { href: "/admin/parcours", label: "Éléments de parcours", value: stats.timeline, icon: GraduationCap },
        { href: "/admin/messages", label: "Messages non lus", value: stats.unread, icon: Mail },
      ]
    : [];

  return (
    <>
      <PageHeader title="Vue d'ensemble" description="Tout ce que tu modifies ici est publié immédiatement sur ton site." />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ href, label, value, sub, icon: Icon }) => (
          <Link key={href} href={href} className="rounded-2xl border border-dark-4 bg-dark-2 p-5 hover:border-accent/40 transition">
            <Icon size={18} className="text-accent" />
            <p className="mt-3 font-display text-3xl font-bold text-foreground">{value}</p>
            <p className="text-xs text-muted">{label}</p>
            {sub && <p className="text-[11px] text-muted/70 mt-0.5">{sub}</p>}
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <section className="rounded-2xl border border-dark-4 bg-dark-2 p-5">
          <h2 className="font-display font-bold text-foreground mb-4">État de la configuration</h2>
          <ul className="space-y-3">
            {checks.map((c) => (
              <li key={c.label} className="flex gap-3">
                {c.ok ? <CheckCircle2 size={18} className="text-accent shrink-0" /> : <CircleAlert size={18} className="text-amber-400 shrink-0" />}
                <div>
                  <p className="text-sm text-foreground">{c.label}</p>
                  <p className="text-xs text-muted">{c.hint}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-dark-4 bg-dark-2 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-foreground">Derniers messages</h2>
            <Link href="/admin/messages" className="text-xs text-accent">Tout voir →</Link>
          </div>
          {recent.length === 0 ? (
            <p className="text-sm text-muted">Aucun message.</p>
          ) : (
            <ul className="space-y-3">
              {recent.map((m) => (
                <li key={m.id} className="text-sm">
                  <p className={m.read ? "text-muted" : "text-foreground font-semibold"}>{m.subject}</p>
                  <p className="text-xs text-muted">{m.name} · {m.createdAt.toLocaleDateString("fr-FR")}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        <Link href="/admin/blog/new" className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-[#0f0f0f]">+ Nouvel article</Link>
        <Link href="/admin/projets/new" className="rounded-full border border-dark-4 px-5 py-2 text-sm text-muted hover:text-foreground">+ Nouveau projet</Link>
        <a href="/cv" target="_blank" className="inline-flex items-center gap-2 rounded-full border border-dark-4 px-5 py-2 text-sm text-muted hover:text-foreground"><FileText size={14} /> Voir le CV</a>
      </div>
    </>
  );
}
