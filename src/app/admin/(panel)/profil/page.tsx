import { getSiteContent } from "@/lib/content/get";
import { Card, Flash, I18nField, Input, PageHeader } from "@/components/admin/fields";
import { SubmitButton } from "@/components/admin/buttons";
import MediaInput from "@/components/admin/MediaInput";
import type { SearchParams } from "@/lib/admin/util";
import { saveProfile } from "./actions";

export default async function ProfilPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const p = (await getSiteContent()).profile;
  const useBlob = Boolean(process.env.BLOB_READ_WRITE_TOKEN);

  return (
    <>
      <PageHeader title="Profil & textes" description="Identité, coordonnées et textes de l'accueil et de la section « À propos ». Chaque texte existe en français et en anglais." />
      <Flash {...sp} />
      <form action={saveProfile} className="space-y-5">
        <Card title="Identité">
          <div className="grid gap-4 md:grid-cols-3">
            <Input name="name" label="Nom complet" defaultValue={p.name} required />
            <Input name="firstName" label="Prénom" defaultValue={p.firstName} />
            <Input name="lastName" label="Nom" defaultValue={p.lastName} />
          </div>
          <MediaInput name="photo" label="Photo de profil" defaultValue={p.photo} useBlob={useBlob} hint="Utilisée dans la barre latérale, sur mobile et sur le CV." />
        </Card>

        <Card title="Coordonnées & réseaux">
          <div className="grid gap-4 md:grid-cols-2">
            <Input name="email" label="Email" type="email" defaultValue={p.email} required />
            <Input name="phone" label="Téléphone" defaultValue={p.phone} />
            <Input name="address" label="Adresse affichée" defaultValue={p.address} />
            <Input name="portfolioUrl" label="Adresse du site" defaultValue={p.portfolioUrl} hint="Ton nom de domaine, par ex. https://loezegou.com" />
          </div>
          <I18nField name="location" label="Localisation" value={p.location} />
          <div className="grid gap-4 md:grid-cols-2">
            <Input name="github" label="GitHub" defaultValue={p.social.github} />
            <Input name="linkedin" label="LinkedIn" defaultValue={p.social.linkedin} />
            <Input name="instagram" label="Instagram" defaultValue={p.social.instagram} />
            <Input name="whatsapp" label="WhatsApp" defaultValue={p.social.whatsapp} />
          </div>
        </Card>

        <Card title="Accueil" description="« Bonjour, je suis Loé Zegou, [ligne 3] [ligne 4] »">
          <I18nField name="heroLine3" label="Ligne 3" value={p.hero.line3} />
          <I18nField name="heroLine4" label="Ligne 4" value={p.hero.line4} />
          <I18nField name="heroTagline" label="Accroche" value={p.hero.tagline} multiline rows={2} />
          <I18nField name="sidebarLines" label="Sous-titre de la barre latérale" value={p.sidebarLines} multiline rows={4} hint="Une ligne par retour à la ligne." />
          <div className="grid gap-4 md:grid-cols-2">
            <Input name="yearsStudy" label="Compteur « Années d'études »" type="number" defaultValue={p.hero.yearsStudy} />
            <Input name="proExp" label="Compteur « Expérience pro »" type="number" defaultValue={p.hero.proExp} />
          </div>
        </Card>

        <Card title="À propos">
          <I18nField name="bio" label="Biographie" value={p.about.bio} multiline rows={6} />
          <I18nField name="strengths" label="Qualités" value={p.about.strengths} multiline rows={4} hint="Une qualité par ligne." />
          <I18nField name="aboutBadge" label="Badge sur la photo" value={p.about.badge} />
          <div className="grid gap-4">
            <I18nField name="factFormation" label="Info clé : formation" value={p.about.factFormation} />
            <I18nField name="factSpecialty" label="Info clé : spécialité" value={p.about.factSpecialty} />
            <I18nField name="factLocation" label="Info clé : localisation" value={p.about.factLocation} />
          </div>
        </Card>

        <div className="sticky bottom-4 flex justify-end">
          <SubmitButton />
        </div>
      </form>
    </>
  );
}
