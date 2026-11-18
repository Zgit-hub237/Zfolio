import Link from "next/link";
import { Plus } from "lucide-react";
import { getSiteContent } from "@/lib/content/get";
import { btnPrimary, Flash, PageHeader } from "@/components/admin/fields";
import ListTable from "@/components/admin/ListTable";
import type { SearchParams } from "@/lib/admin/util";

export default async function ParcoursPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const { timeline } = await getSiteContent();
  const row = (i: (typeof timeline)[number]) => ({
    id: i.id,
    title: i.title.fr || i.title.en,
    meta: `${i.period.fr} · ${[i.org.fr, i.place.fr].filter(Boolean).join(", ")}`,
    muted: !i.showOnSite && !i.showOnCv,
    badges: [
      i.certification ? "certification" : "",
      i.current ? "en cours" : "",
      i.older ? "ancien" : "",
      i.showOnSite ? "site" : "",
      i.showOnCv ? "CV" : "",
    ].filter(Boolean),
  });

  return (
    <>
      <PageHeader
        title="Parcours"
        description="Formations, certifications et expériences. L'ordre suit le champ « Ordre » (du plus petit au plus grand)."
        actions={
          <Link href="/admin/parcours/new" className={btnPrimary}>
            <Plus size={15} /> Ajouter
          </Link>
        }
      />
      <Flash {...sp} />
      <h2 className="text-xs uppercase tracking-widest text-muted mb-2">Expériences</h2>
      <ListTable rows={timeline.filter((i) => i.kind === "experience").map(row)} basePath="/admin/parcours" />
      <h2 className="text-xs uppercase tracking-widest text-muted mb-2 mt-8">Formations & certifications</h2>
      <ListTable rows={timeline.filter((i) => i.kind === "education").map(row)} basePath="/admin/parcours" />
    </>
  );
}
