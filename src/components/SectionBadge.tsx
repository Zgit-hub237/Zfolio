import type { LucideIcon } from "lucide-react";

interface SectionBadgeProps {
  icon: LucideIcon;
  label: string;
}

export default function SectionBadge({ icon: Icon, label }: SectionBadgeProps) {
  return (
    <div className="section-badge">
      <Icon size={12} />
      {label}
    </div>
  );
}
