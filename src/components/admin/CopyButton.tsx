"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { btnGhost } from "./fields";

export default function CopyButton({ value }: { value: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className={btnGhost}
      onClick={async () => {
        const full = value.startsWith("/") ? `${window.location.origin}${value}` : value;
        await navigator.clipboard.writeText(full);
        setDone(true);
        setTimeout(() => setDone(false), 1500);
      }}
    >
      {done ? <Check size={14} /> : <Copy size={14} />} {done ? "Copié" : "Copier le lien"}
    </button>
  );
}
