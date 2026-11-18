"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminConfigured, checkCredentials } from "@/lib/auth";
import { createSessionToken, cookieOptions, SESSION_COOKIE } from "@/lib/auth/session";
import { clearEvents, clientIp, countEvents, recordEvent } from "@/lib/rate-limit";

const WINDOW = 15 * 60 * 1000;
const MAX_PER_IP = 5;
const MAX_GLOBAL = 30;

export type LoginState = { error?: string };

export async function login(_prev: LoginState, fd: FormData): Promise<LoginState> {
  if (!adminConfigured()) return { error: "L'administration n'est pas configurée (voir le README)." };

  const ip = await clientIp();
  const [byIp, global] = await Promise.all([
    countEvents("login_fail", ip, WINDOW),
    countEvents("login_fail", "*", WINDOW),
  ]);
  if (byIp >= MAX_PER_IP || global >= MAX_GLOBAL) {
    return { error: "Trop de tentatives. Réessaie dans 15 minutes." };
  }

  const email = String(fd.get("email") ?? "").slice(0, 200);
  const password = String(fd.get("password") ?? "").slice(0, 200);
  const otp = String(fd.get("otp") ?? "").replace(/\s/g, "").slice(0, 6);

  const ok = await checkCredentials(email, password, otp);
  if (!ok) {
    await Promise.all([recordEvent("login_fail", ip), recordEvent("login_fail", "*")]);
    return { error: "Identifiants invalides." };
  }

  await clearEvents("login_fail", ip);
  const store = await cookies();
  store.set(SESSION_COOKIE, await createSessionToken(), cookieOptions);
  redirect("/admin");
}

export async function logout() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  redirect("/admin/login");
}
