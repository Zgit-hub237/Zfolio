import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { createInterface } from "node:readline";

export const ENV_FILE = ".env.local";

export function loadEnv() {
  if (existsSync(ENV_FILE)) process.loadEnvFile(ENV_FILE);
}

/** Ajoute ou remplace des variables dans .env.local sans toucher aux autres. */
export function upsertEnv(values: Record<string, string>) {
  const lines = existsSync(ENV_FILE) ? readFileSync(ENV_FILE, "utf8").split(/\r?\n/) : [];
  for (const [key, value] of Object.entries(values)) {
    const line = `${key}="${value}"`;
    const i = lines.findIndex((l) => l.startsWith(`${key}=`));
    if (i >= 0) lines[i] = line;
    else lines.push(line);
  }
  writeFileSync(ENV_FILE, lines.filter((l, i, a) => l !== "" || i < a.length - 1).join("\n") + "\n");
}

export function ask(question: string, hidden = false): Promise<string> {
  return new Promise((resolve) => {
    const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    if (hidden) {
      // Masque la saisie (mot de passe)
      const out = rl as unknown as { _writeToOutput: (s: string) => void; output: NodeJS.WriteStream };
      out._writeToOutput = (s: string) => {
        if (s.startsWith(question)) process.stdout.write(question);
        else if (s.includes("\n") || s.includes("\r")) process.stdout.write("\n");
        else process.stdout.write("*".repeat(s.length));
      };
    }
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}
