"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { messages } from "@/lib/db/schema";
import { adminDb, savedAndBack } from "@/lib/admin/util";

export async function toggleRead(fd: FormData) {
  const db = await adminDb("/admin/messages");
  const id = Number(fd.get("id"));
  await db.update(messages).set({ read: fd.get("read") === "true" }).where(eq(messages.id, id));
  revalidatePath("/admin", "layout");
}

export async function deleteMessage(fd: FormData) {
  const db = await adminDb("/admin/messages");
  await db.delete(messages).where(eq(messages.id, Number(fd.get("id"))));
  savedAndBack("/admin/messages");
}
