/**
 * Configure l'accès admin : email, mot de passe (haché Argon2id) et secret de session.
 * Usage : npm run admin:setup
 */
import { randomBytes } from "node:crypto";
import { hash } from "@node-rs/argon2";
import { ask, loadEnv, upsertEnv } from "./lib";

async function main() {
  loadEnv();
  console.log("\n=== Configuration de l'administration du portfolio ===\n");

  const email = (await ask(`Email de connexion${process.env.ADMIN_EMAIL ? ` [${process.env.ADMIN_EMAIL}]` : ""} : `)) || process.env.ADMIN_EMAIL || "";
  if (!email.includes("@")) throw new Error("Email invalide.");

  const password = await ask("Nouveau mot de passe (12 caractères minimum) : ", true);
  if (password.length < 12) throw new Error("Mot de passe trop court (12 caractères minimum).");
  const confirm = await ask("Confirme le mot de passe : ", true);
  if (password !== confirm) throw new Error("Les deux mots de passe ne correspondent pas.");

  const passwordHash = await hash(password, { memoryCost: 19456, timeCost: 2, parallelism: 1 });
  const hashB64 = Buffer.from(passwordHash).toString("base64");
  const sessionSecret = process.env.SESSION_SECRET && process.env.SESSION_SECRET.length >= 32
    ? process.env.SESSION_SECRET
    : randomBytes(32).toString("base64url");

  upsertEnv({ ADMIN_EMAIL: email, ADMIN_PASSWORD_HASH_B64: hashB64, SESSION_SECRET: sessionSecret });

  console.log("\n✔ .env.local mis à jour (ADMIN_EMAIL, ADMIN_PASSWORD_HASH_B64, SESSION_SECRET).");
  console.log("\nPour la production, ajoute ces 3 variables dans Vercel → Settings → Environment Variables :");
  console.log(`  ADMIN_EMAIL             = ${email}`);
  console.log(`  ADMIN_PASSWORD_HASH_B64 = ${hashB64}`);
  console.log("  SESSION_SECRET          = (la valeur présente dans .env.local)");
  console.log("\nRedémarre ensuite le serveur (npm run dev) et connecte-toi sur /admin.\n");
}

main().catch((err) => {
  console.error(`\n✖ ${err.message}\n`);
  process.exit(1);
});
