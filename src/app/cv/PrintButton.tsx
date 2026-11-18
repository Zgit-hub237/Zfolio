"use client";

import { Printer } from "lucide-react";

export default function PrintButton({ className, label = "Imprimer" }: { className?: string; label?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.print()}>
      <Printer size={14} />
      {label}
    </button>
  );
}
