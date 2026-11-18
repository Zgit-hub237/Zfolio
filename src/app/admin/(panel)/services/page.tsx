import Link from "next/link";
import { Plus } from "lucide-react";
import { getSiteContent } from "@/lib/content/get";
import { btnPrimary, Flash, PageHeader } from "@/components/admin/fields";
import ListTable from "@/components/admin/ListTable";
import type { SearchParams } from "@/lib/admin/util";

export default async function ServicesPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const { services } = await getSiteContent();
  return (
    <>
      <PageHeader
        title="Services"
        description="Tes spécialisations, affichées dans la section « Services »."
        actions={<Link href="/admin/services/new" className={btnPrimary}><Plus size={15} /> Ajouter</Link>}
      />
      <Flash {...sp} />
      <ListTable
        basePath="/admin/services"
        rows={services.map((s) => ({ id: s.id, title: s.title.fr || s.title.en, meta: s.count.fr, badges: [s.icon] }))}
      />
    </>
  );
}
