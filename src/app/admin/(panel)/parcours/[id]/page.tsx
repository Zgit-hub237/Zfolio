import Link from "next/link";
import { notFound } from "next/navigation";
import { getSiteContent } from "@/lib/content/get";
import { btnGhost, Card, Checkbox, Flash, I18nField, Input, PageHeader, Select, Textarea } from "@/components/admin/fields";
import { DeleteButton, SubmitButton } from "@/components/admin/buttons";
import MediaInput from "@/components/admin/MediaInput";
import type { SearchParams } from "@/lib/admin/util";
import { deleteTimeline, saveTimeline } from "../actions";

export default async function EditTimeline({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: SearchParams }) {
  const { id } = await params;
  const sp = await searchParams;
  const { timeline } = await getSiteContent();
  const isNew = id === "new";
  const item = isNew ? null : timeline.find((i) => i.id === Number(id));
  if (!isNew && !item) notFound();
  const maxOrder = Math.max(0, ...timeline.map((i) => i.sortOrder));
  const statsText = (lng: "fr" | "en") => (item?.stats?.[lng] ?? []).map((s) => `${s.label} : ${s.value}`).join("\n");

  return (
    <>
      <PageHeader
        title={isNew ? "Nouvel élément de parcours" : item!.title.fr}
        actions={<Link href="/admin/parcours" className={btnGhost}>← Retour</Link>}
      />
      <Flash {...sp} />
      <form action={saveTimeline} className="space-y-5">
        <input type="hidden" name="id" value={isNew ? "new" : item!.id} />
        <Card title="Informations">
          <div className="grid gap-4 md:grid-cols-2">
            <Select
              name="kind"
              label="Type"
              defaultValue={item?.kind ?? "experience"}
              options={[
                { value: "experience", label: "Expérience" },
                { value: "education", label: "Formation / certification" },
              ]}
            />
            <Input name="sortOrder" label="Ordre" type="number" defaultValue={item?.sortOrder ?? maxOrder + 10} hint="Plus petit = plus haut." />
          </div>
          <I18nField name="title" label="Intitulé" value={item?.title} />
          <I18nField name="org" label="Organisation / école" value={item?.org} />
          <I18nField name="place" label="Lieu" value={item?.place} />
          <I18nField name="period" label="Période" value={item?.period} hint="Ex. : Mars 2026 — Juin 2026" />
          <I18nField name="duration" label="Durée (facultatif)" value={item?.duration} hint="Ex. : 3 mois" />
          <Textarea name="tags" label="Tags" defaultValue={item?.tags.join(", ")} rows={2} hint="Séparés par des virgules." />
        </Card>

        <Card title="Textes">
          <I18nField name="description" label="Description (site)" value={item?.description} multiline rows={4} />
          <I18nField name="cvBullets" label="Points pour le CV" value={item?.cvBullets} multiline rows={3} hint="Un point par ligne. Pour une formation : une phrase de résumé." />
        </Card>

        <Card title="Affichage">
          <div className="grid gap-3 md:grid-cols-2">
            <Checkbox name="showOnSite" label="Afficher sur le site" defaultChecked={item?.showOnSite ?? true} />
            <Checkbox name="showOnCv" label="Afficher sur le CV" defaultChecked={item?.showOnCv ?? true} />
            <Checkbox name="current" label="En cours" defaultChecked={item?.current} />
            <Checkbox name="certification" label="Certification" defaultChecked={item?.certification} hint="Va dans la section « Certifications » du CV." />
            <Checkbox name="older" label="Ancien (derrière « Voir plus »)" defaultChecked={item?.older} hint="Pour le bac, le BEPC…" />
          </div>
        </Card>

        <Card title="Certificat & chiffres (facultatif)">
          <div className="grid gap-4 md:grid-cols-2">
            <Input name="credlyBadgeId" label="ID du badge Credly" defaultValue={item?.credlyBadgeId} />
            <MediaInput name="certificateUrl" label="Certificat (PDF)" defaultValue={item?.certificateUrl} useBlob={Boolean(process.env.BLOB_READ_WRITE_TOKEN)} accept="application/pdf" />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Textarea name="stats_fr" label="Chiffres (FR)" defaultValue={statsText("fr")} rows={3} hint="Une ligne « Libellé : valeur »" />
            <Textarea name="stats_en" label="Chiffres (EN)" defaultValue={statsText("en")} rows={3} />
          </div>
        </Card>

        <div className="flex justify-end">
          <SubmitButton />
        </div>
      </form>
      {!isNew && (
        <div className="mt-6 flex justify-end">
          <DeleteButton action={deleteTimeline} id={item!.id} />
        </div>
      )}
    </>
  );
}
