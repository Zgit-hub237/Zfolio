import type { Metadata } from "next";
import { count, eq } from "drizzle-orm";
import { requireAdmin } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { messages } from "@/lib/db/schema";
import AdminNav from "@/components/admin/AdminNav";

export const metadata: Metadata = { title: "Admin — Zfolio", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  const db = await getDb();
  const unread = db
    ? Number((await db.select({ n: count() }).from(messages).where(eq(messages.read, false)))[0]?.n ?? 0)
    : 0;

  return (
    <div className="min-h-screen bg-dark text-foreground">
      <AdminNav unread={unread} />
      <main className="lg:ml-60 px-4 sm:px-8 py-6 sm:py-10 max-w-5xl">{children}</main>
    </div>
  );
}
