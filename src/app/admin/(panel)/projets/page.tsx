import Link from "next/link";
import { Plus } from "lucide-react";
import { getSiteContent } from "@/lib/content/get";
import { btnPrimary, Flash, PageHeader } from "@/components/admin/fields";
import ListTable from "@/components/admin/ListTable";
import type { SearchParams } from "@/lib/admin/util";

export default async function ProjetsPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const { projects } = await getSiteContent();

  return (
    <>
      <PageHeader
        title="Projets"
        description="Projets affichés dans la section Portfolio du site et, si coché, sur le CV."
        actions={
          <Link href="/admin/projets/new" className={btnPrimary}>
            <Plus size={15} /> Ajouter
          </Link>
        }
      />
      <Flash {...sp} />
      <ListTable
        basePath="/admin/projets"
        rows={projects.map((p) => ({
          id: p.id,
          title: p.title.fr || p.title.en,
          meta: p.tags.join(" · "),
          muted: !p.published,
          badges: [p.category, p.published ? "site" : "masqué", p.showOnCv ? "CV" : ""].filter(Boolean),
        }))}
      />
    </>
  );
}
