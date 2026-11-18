import Link from "next/link";
import { Plus } from "lucide-react";
import { getSiteContent } from "@/lib/content/get";
import { btnPrimary, Card, Flash, inputCls, PageHeader } from "@/components/admin/fields";
import { SubmitButton } from "@/components/admin/buttons";
import ListTable from "@/components/admin/ListTable";
import type { SearchParams } from "@/lib/admin/util";
import { saveCvSkills } from "./actions";

export default async function CompetencesPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const { skills, cvSkills } = await getSiteContent();
  const groups = [...cvSkills, ...Array.from({ length: 2 }, () => ({ title: { fr: "", en: "" }, items: [] as string[] }))];

  return (
    <>
      <PageHeader
        title="Compétences"
        description="Les cercles animés et la liste « Également maîtrisé » du site, puis les groupes de compétences du CV."
        actions={<Link href="/admin/competences/new" className={btnPrimary}><Plus size={15} /> Ajouter une compétence</Link>}
      />
      <Flash {...sp} />

      <h2 className="text-xs uppercase tracking-widest text-muted mb-2">Cercles (avec pourcentage)</h2>
      <ListTable
        basePath="/admin/competences"
        rows={skills.filter((s) => s.kind === "circle").map((s) => ({ id: s.id, title: s.name, meta: `${s.percent} %` }))}
      />
      <h2 className="text-xs uppercase tracking-widest text-muted mb-2 mt-8">Également maîtrisé</h2>
      <ListTable
        basePath="/admin/competences"
        rows={skills.filter((s) => s.kind === "secondary").map((s) => ({ id: s.id, title: s.name }))}
      />

      <form action={saveCvSkills} className="mt-10">
        <Card title="Compétences du CV" description="Un groupe par ligne : titre FR, titre EN, et les compétences séparées par des virgules. Laisse une ligne vide pour la supprimer.">
          {groups.map((g, i) => (
            <div key={i} className="grid gap-2 md:grid-cols-[1fr_1fr_2fr]">
              <input name={`g${i}_title_fr`} defaultValue={g.title.fr} placeholder="Titre FR" className={inputCls} />
              <input name={`g${i}_title_en`} defaultValue={g.title.en} placeholder="Titre EN" className={inputCls} />
              <input name={`g${i}_items`} defaultValue={g.items.join(", ")} placeholder="Compétence 1, Compétence 2…" className={inputCls} />
            </div>
          ))}
          <div className="flex justify-end"><SubmitButton>Enregistrer les groupes</SubmitButton></div>
        </Card>
      </form>
    </>
  );
}
