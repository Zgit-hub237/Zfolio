import { CheckCircle2, CircleAlert } from "lucide-react";
import { totpEnabled } from "@/lib/auth";
import { Card, PageHeader } from "@/components/admin/fields";

export default function SecuritePage() {
  const items = [
    { ok: true, label: "Mot de passe haché avec Argon2id", hint: "Le mot de passe n'est jamais stocké en clair, ni dans la base, ni dans le code." },
    { ok: true, label: "Session signée (JWT HS256) dans un cookie httpOnly, SameSite=Strict", hint: "Expire après 8 h. Inaccessible au JavaScript de la page." },
    { ok: true, label: "Limitation des tentatives de connexion", hint: "5 échecs par IP et 30 au total par tranche de 15 minutes." },
    { ok: true, label: "Toutes les actions vérifient la session côté serveur", hint: "En plus du middleware qui protège /admin." },
    { ok: true, label: "Liens filtrés (http, https, chemins internes)", hint: "Bloque les liens javascript: dans tout le contenu éditable." },
    { ok: true, label: "Articles en Markdown sans HTML brut", hint: "Un article ne peut pas injecter de script." },
    { ok: totpEnabled(), label: "Double authentification (TOTP)", hint: totpEnabled() ? "Activée." : "Désactivée : lance « npm run admin:2fa » puis ajoute ADMIN_TOTP_SECRET." },
  ];

  return (
    <>
      <PageHeader title="Sécurité" description="Mesures de protection du dashboard." />
      <Card>
        <ul className="space-y-4">
          {items.map((i) => (
            <li key={i.label} className="flex gap-3">
              {i.ok ? <CheckCircle2 size={18} className="text-accent shrink-0 mt-0.5" /> : <CircleAlert size={18} className="text-amber-400 shrink-0 mt-0.5" />}
              <div>
                <p className="text-sm text-foreground">{i.label}</p>
                <p className="text-xs text-muted">{i.hint}</p>
              </div>
            </li>
          ))}
        </ul>
      </Card>
      <div className="mt-5">
        <Card title="Changer le mot de passe">
          <ol className="list-decimal pl-5 text-sm text-muted space-y-1">
            <li>Dans le projet, lance <code className="text-accent">npm run admin:setup</code> et saisis le nouveau mot de passe.</li>
            <li>Copie la nouvelle valeur de <code>ADMIN_PASSWORD_HASH_B64</code> dans Vercel (Settings → Environment Variables).</li>
            <li>Redéploie : toutes les sessions ouvertes sont automatiquement déconnectées.</li>
          </ol>
        </Card>
      </div>
    </>
  );
}
