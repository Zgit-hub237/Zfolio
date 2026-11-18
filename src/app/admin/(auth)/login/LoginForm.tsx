"use client";

import { useActionState } from "react";
import { Lock } from "lucide-react";
import { login, type LoginState } from "./actions";
import { inputCls, Label, btnPrimary } from "@/components/admin/fields";

export default function LoginForm({ totp }: { totp: boolean }) {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, {});

  return (
    <form action={action} className="space-y-4">
      <label className="block">
        <Label>Email</Label>
        <input name="email" type="email" autoComplete="username" required className={inputCls} />
      </label>
      <label className="block">
        <Label>Mot de passe</Label>
        <input name="password" type="password" autoComplete="current-password" required className={inputCls} />
      </label>
      {totp && (
        <label className="block">
          <Label hint="Code à 6 chiffres de ton application d'authentification">Code 2FA</Label>
          <input name="otp" inputMode="numeric" pattern="[0-9 ]{6,7}" autoComplete="one-time-code" required className={inputCls} />
        </label>
      )}
      {state.error && (
        <p role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {state.error}
        </p>
      )}
      <button type="submit" disabled={pending} className={`${btnPrimary} w-full`}>
        <Lock size={14} /> {pending ? "Vérification…" : "Se connecter"}
      </button>
    </form>
  );
}
