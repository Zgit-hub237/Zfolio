import Link from "next/link";
import { notFound } from "next/navigation";
import { getSiteContent } from "@/lib/content/get";
import { btnGhost, Card, Flash, I18nField, Input, PageHeader, Select } from "@/components/admin/fields";
import { DeleteButton, SubmitButton } from "@/components/admin/buttons";
import type { SearchParams } from "@/lib/admin/util";
import { deleteService, saveService } from "../actions";

export default async function EditService({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: SearchParams }) {
  const { id } = await params;
  const sp = await searchParams;
  const { services } = await getSiteContent();
  const isNew = id === "new";
  const s = isNew ? null : services.find((x) => x.id === Number(id));
  if (!isNew && !s) notFound();
  const maxOrder = Math.max(0, ...services.map((x) => x.sortOrder));

  return (
    <>
      <PageHeader title={isNew ? "Nouveau service" : s!.title.fr} actions={<Link href="/admin/services" className={btnGhost}>← Retour</Link>} />
      <Flash {...sp} />
      <form action={saveService} className="space-y-5">
        <input type="hidden" name="id" value={isNew ? "new" : s!.id} />
        <Card>
          <div className="grid gap-4 md:grid-cols-2">
            <Select
              name="icon"
              label="Icône"
              defaultValue={s?.icon ?? "shield"}
              options={[
                { value: "shield", label: "Bouclier (sécurité)" },
                { value: "globe", label: "Globe (web)" },
                { value: "smartphone", label: "Smartphone (mobile)" },
                { value: "monitor", label: "Écran (desktop)" },
              ]}
            />
            <Input name="sortOrder" label="Ordre" type="number" defaultValue={s?.sortOrder ?? maxOrder + 10} />
          </div>
          <I18nField name="title" label="Titre" value={s?.title} />
          <I18nField name="description" label="Description" value={s?.description} multiline rows={4} />
          <I18nField name="count" label="Mention sous la description" value={s?.count} hint="Ex. : 3 PROJETS" />
        </Card>
        <div className="flex justify-end"><SubmitButton /></div>
      </form>
      {!isNew && <div className="mt-6 flex justify-end"><DeleteButton action={deleteService} id={s!.id} /></div>}
    </>
  );
}
