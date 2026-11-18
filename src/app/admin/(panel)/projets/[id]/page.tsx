import Link from "next/link";
import { notFound } from "next/navigation";
import { getSiteContent } from "@/lib/content/get";
import { btnGhost, Card, Checkbox, Flash, I18nField, Input, PageHeader, Select, Textarea } from "@/components/admin/fields";
import { DeleteButton, SubmitButton } from "@/components/admin/buttons";
import MediaInput from "@/components/admin/MediaInput";
import type { SearchParams } from "@/lib/admin/util";
import { deleteProject, saveProject } from "../actions";

export default async function EditProject({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: SearchParams }) {
  const { id } = await params;
  const sp = await searchParams;
  const { projects } = await getSiteContent();
  const isNew = id === "new";
  const p = isNew ? null : projects.find((x) => x.id === Number(id));
  if (!isNew && !p) notFound();
  const maxOrder = Math.max(0, ...projects.map((x) => x.sortOrder));

  return (
    <>
      <PageHeader title={isNew ? "Nouveau projet" : p!.title.fr} actions={<Link href="/admin/projets" className={btnGhost}>← Retour</Link>} />
      <Flash {...sp} />
      <form action={saveProject} className="space-y-5">
        <input type="hidden" name="id" value={isNew ? "new" : p!.id} />
        <Card title="Projet">
          <I18nField name="title" label="Titre" value={p?.title} />
          <I18nField name="description" label="Description" value={p?.description} multiline rows={4} />
          <div className="grid gap-4 md:grid-cols-2">
            <Select
              name="category"
              label="Catégorie (filtre du site)"
              defaultValue={p?.category ?? "web"}
              options={[
                { value: "web", label: "Web" },
                { value: "mobile", label: "Mobile" },
                { value: "desktop", label: "Desktop" },
                { value: "security", label: "Sécurité" },
              ]}
            />
            <Input name="sortOrder" label="Ordre" type="number" defaultValue={p?.sortOrder ?? maxOrder + 10} />
          </div>
          <Textarea name="tags" label="Technologies" defaultValue={p?.tags.join(", ")} rows={2} hint="Séparées par des virgules." />
          <MediaInput name="image" label="Image (facultatif)" defaultValue={p?.image} useBlob={Boolean(process.env.BLOB_READ_WRITE_TOKEN)} hint="Capture d'écran du projet. Sans image, une bannière colorée est affichée." />
          <div className="grid gap-4 md:grid-cols-2">
            <Input name="link" label="Lien de démo" defaultValue={p?.link} />
            <Input name="github" label="Lien GitHub" defaultValue={p?.github} />
          </div>
        </Card>
        <Card title="Version CV">
          <I18nField name="cvText" label="Résumé court pour le CV" value={p?.cvText} multiline rows={2} />
          <Input name="cvTags" label="Technos affichées sur le CV" defaultValue={p?.cvTags} hint="Ex. : Node.js · JWT · Playwright" />
        </Card>
        <Card title="Affichage">
          <div className="grid gap-3 md:grid-cols-2">
            <Checkbox name="published" label="Afficher sur le site" defaultChecked={p?.published ?? true} />
            <Checkbox name="showOnCv" label="Afficher sur le CV" defaultChecked={p?.showOnCv ?? false} />
          </div>
        </Card>
        <div className="flex justify-end">
          <SubmitButton />
        </div>
      </form>
      {!isNew && (
        <div className="mt-6 flex justify-end">
          <DeleteButton action={deleteProject} id={p!.id} />
        </div>
      )}
    </>
  );
}
