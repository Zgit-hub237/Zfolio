"use server";

import { eq } from "drizzle-orm";
import { services } from "@/lib/db/schema";
import { int, l, str } from "@/lib/admin/form";
import { adminDb, savedAndBack } from "@/lib/admin/util";

const ICONS = ["shield", "globe", "smartphone", "monitor"];

export async function saveService(fd: FormData) {
  const db = await adminDb("/admin/services");
  const id = str(fd, "id");
  const icon = str(fd, "icon");
  const values = {
    icon: ICONS.includes(icon) ? icon : "shield",
    title: l(fd, "title", 200),
    description: l(fd, "description", 2000),
    count: l(fd, "count", 60),
    sortOrder: int(fd, "sortOrder", 0),
  };
  if (id === "new" || !id) await db.insert(services).values(values);
  else await db.update(services).set(values).where(eq(services.id, Number(id)));
  savedAndBack("/admin/services");
}

export async function deleteService(fd: FormData) {
  const db = await adminDb("/admin/services");
  await db.delete(services).where(eq(services.id, Number(fd.get("id"))));
  savedAndBack("/admin/services");
}
