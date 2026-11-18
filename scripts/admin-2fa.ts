/**
 * Active la double authentification (TOTP) : génère un secret et affiche un QR code
 * à scanner avec Google Authenticator, Microsoft Authenticator, Aegis…
 * Usage : npm run admin:2fa
 */
import * as OTPAuth from "otpauth";
import QRCode from "qrcode";
import { ask, loadEnv, upsertEnv } from "./lib";

async function main() {
  loadEnv();
  const secret = new OTPAuth.Secret({ size: 20 });
  const totp = new OTPAuth.TOTP({
    issuer: "Zfolio",
    label: process.env.ADMIN_EMAIL || "admin",
    secret,
  });

  console.log("\nScanne ce QR code avec ton application d'authentification :\n");
  console.log(await QRCode.toString(totp.toString(), { type: "terminal", small: true }));
  console.log(`Ou saisis ce code manuellement : ${secret.base32}\n`);

  const code = await ask("Code à 6 chiffres affiché par l'application : ");
  if (totp.validate({ token: code.replace(/\s/g, ""), window: 1 }) === null) {
    throw new Error("Code incorrect : la 2FA n'a pas été activée. Relance la commande.");
  }

  upsertEnv({ ADMIN_TOTP_SECRET: secret.base32 });
  console.log("\n✔ 2FA activée dans .env.local (ADMIN_TOTP_SECRET).");
  console.log("Ajoute aussi ADMIN_TOTP_SECRET dans Vercel → Settings → Environment Variables, puis redéploie.\n");
}

main().catch((err) => {
  console.error(`\n✖ ${err.message}\n`);
  process.exit(1);
});
