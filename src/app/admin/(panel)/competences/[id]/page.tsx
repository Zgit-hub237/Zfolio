import Link from "next/link";
import { notFound } from "next/navigation";
import { getSiteContent } from "@/lib/content/get";
import { btnGhost, Card, Flash, Input, PageHeader, Select } from "@/components/admin/fields";
import { DeleteButton, SubmitButton } from "@/components/admin/buttons";
import MediaInput from "@/components/admin/MediaInput";
import type { SearchParams } from "@/lib/admin/util";
import { deleteSkill, saveSkill } from "../actions";

export default async function EditSkill({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: SearchParams }) {
  const { id } = await params;
  const sp = await searchParams;
  const { skills } = await getSiteContent();
  const isNew = id === "new";
  const s = isNew ? null : skills.find((x) => x.id === Number(id));
  if (!isNew && !s) notFound();
  const maxOrder = Math.max(0, ...skills.map((x) => x.sortOrder));

  return (
    <>
      <PageHeader title={isNew ? "Nouvelle compétence" : s!.name} actions={<Link href="/admin/competences" className={btnGhost}>← Retour</Link>} />
      <Flash {...sp} />
      <form action={saveSkill} className="space-y-5">
        <input type="hidden" name="id" value={isNew ? "new" : s!.id} />
        <Card>
          <div className="grid gap-4 md:grid-cols-2">
            <Input name="name" label="Nom" defaultValue={s?.name} required />
            <Select
              name="kind"
              label="Affichage"
              defaultValue={s?.kind ?? "circle"}
              options={[
                { value: "circle", label: "Cercle avec pourcentage" },
                { value: "secondary", label: "Liste « Également maîtrisé »" },
              ]}
            />
            <Input name="percent" label="Pourcentage (cercles)" type="number" defaultValue={s?.percent ?? 70} />
            <Input name="sortOrder" label="Ordre" type="number" defaultValue={s?.sortOrder ?? maxOrder + 10} />
          </div>
          <MediaInput name="logo" label="Logo (cercles)" defaultValue={s?.logo} useBlob={Boolean(process.env.BLOB_READ_WRITE_TOKEN)} />
        </Card>
        <div className="flex justify-end"><SubmitButton /></div>
      </form>
      {!isNew && <div className="mt-6 flex justify-end"><DeleteButton action={deleteSkill} id={s!.id} /></div>}
    </>
  );
}
