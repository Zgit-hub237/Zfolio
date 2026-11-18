import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { adminConfigured, isAdmin, totpEnabled } from "@/lib/auth";
import LoginForm from "./LoginForm";

export const metadata: Metadata = { title: "Connexion — Admin", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function LoginPage() {
  if (await isAdmin()) redirect("/admin");
  const configured = adminConfigured();

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-5">
      <div className="w-full max-w-sm rounded-3xl border border-dark-4 bg-dark-2 p-7 shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold text-foreground">Administration</h1>
            <p className="text-xs text-muted">Accès réservé</p>
          </div>
        </div>
        {configured ? (
          <LoginForm totp={totpEnabled()} />
        ) : (
          <div className="text-sm text-muted space-y-2">
            <p>L&apos;administration n&apos;est pas encore configurée.</p>
            <p>
              Lance <code className="text-accent">npm run admin:setup</code> dans le projet pour créer ton mot de passe, puis redémarre le serveur.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
