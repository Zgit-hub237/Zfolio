import { ExternalLink } from "lucide-react";
import { getSiteContent } from "@/lib/content/get";
import { btnGhost, Card, Flash, I18nField, inputCls, Label, PageHeader } from "@/components/admin/fields";
import { SubmitButton } from "@/components/admin/buttons";
import MediaInput from "@/components/admin/MediaInput";
import type { SearchParams } from "@/lib/admin/util";
import { saveCv } from "./actions";

export default async function CvAdminPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const { profile } = await getSiteContent();
  const cv = profile.cv;
  const langs = [...cv.languages, ...Array.from({ length: 2 }, () => ({ name: { fr: "", en: "" }, level: { fr: "", en: "" } }))];

  return (
    <>
      <PageHeader
        title="CV"
        description="Le CV en ligne se construit automatiquement à partir de ton profil, de ton parcours (éléments cochés « CV »), de tes projets et des compétences du CV. Ici, tu règles les textes propres au CV."
        actions={
          <>
            <a href="/cv" target="_blank" className={btnGhost}><ExternalLink size={14} /> CV en français</a>
            <a href="/cv?lang=en" target="_blank" className={btnGhost}><ExternalLink size={14} /> CV en anglais</a>
          </>
        }
      />
      <Flash {...sp} />
      <form action={saveCv} className="space-y-5">
        <Card title="En-tête & profil">
          <I18nField name="headline" label="Titre" value={cv.headline} />
          <I18nField name="subheadline" label="Sous-titre" value={cv.subheadline} />
          <I18nField name="profile" label="Paragraphe de profil" value={cv.profile} multiline rows={5} />
        </Card>
        <Card title="Langues">
          {langs.map((lg, i) => (
            <div key={i} className="grid gap-2 grid-cols-2 md:grid-cols-4">
              <input name={`lang${i}_name_fr`} defaultValue={lg.name.fr} placeholder="Langue (FR)" className={inputCls} />
              <input name={`lang${i}_level_fr`} defaultValue={lg.level.fr} placeholder="Niveau (FR)" className={inputCls} />
              <input name={`lang${i}_name_en`} defaultValue={lg.name.en} placeholder="Language (EN)" className={inputCls} />
              <input name={`lang${i}_level_en`} defaultValue={lg.level.en} placeholder="Level (EN)" className={inputCls} />
            </div>
          ))}
        </Card>
        <Card title="Atouts & centres d'intérêt">
          <I18nField name="strengths" label="Atouts" value={cv.strengths} multiline rows={4} hint="Un par ligne." />
          <I18nField name="interests" label="Centres d'intérêt" value={cv.interests} multiline rows={3} hint="Un par ligne." />
        </Card>
        <Card title="PDF téléchargeable">
          <div className="text-sm text-muted space-y-1">
            <Label>Pour mettre à jour le PDF</Label>
            <p>1. Ouvre le CV en ligne, clique sur « Imprimer » et choisis « Enregistrer au format PDF » (marges : aucune).</p>
            <p>2. Téléverse le PDF ci-dessous : le bouton « Télécharger CV » du site l&apos;utilisera.</p>
          </div>
          <MediaInput name="pdfUrl" label="Fichier PDF du CV" defaultValue={cv.pdfUrl} useBlob={Boolean(process.env.BLOB_READ_WRITE_TOKEN)} accept="application/pdf" hint="Vide = PDF par défaut livré avec le site." />
        </Card>
        <div className="flex justify-end"><SubmitButton /></div>
      </form>
    </>
  );
}
