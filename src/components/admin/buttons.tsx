"use client";

import { useFormStatus } from "react-dom";
import { btnGhost, btnPrimary } from "./fields";

export function SubmitButton({ children = "Enregistrer", className = btnPrimary }: { children?: React.ReactNode; className?: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={className}>
      {pending ? "Enregistrement…" : children}
    </button>
  );
}

/** Bouton de suppression avec confirmation. */
export function DeleteButton({
  action,
  id,
  label = "Supprimer",
  confirmText = "Supprimer définitivement cet élément ?",
}: {
  action: (fd: FormData) => void | Promise<void>;
  id: number | string;
  label?: string;
  confirmText?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(confirmText)) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button type="submit" className={`${btnGhost} hover:!text-red-400 hover:!border-red-500/40`}>
        {label}
      </button>
    </form>
  );
}
