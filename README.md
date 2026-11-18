# Zfolio — portfolio, CV, blog & dashboard

Portfolio Next.js de Loé Zegou Megnizon, entièrement modifiable depuis un dashboard d'administration sécurisé.

| Adresse | Contenu |
| --- | --- |
| `/` | Portfolio (accueil, à propos, parcours, services, compétences, projets, blog, contact) |
| `/cv` · `/cv?lang=en` | CV imprimable A4, généré depuis la base |
| `/blog` · `/blog/[slug]` | Blog / vlog (Markdown, vidéo YouTube / Vimeo / fichier) |
| `/admin` | Dashboard (connexion obligatoire) |

## Développement local

```bash
npm install
npm run admin:setup   # crée ton email + mot de passe admin dans .env.local
npm run dev
```

Sans `DATABASE_URL`, une base Postgres embarquée (PGlite) est créée dans `.data/pglite` et remplie avec le contenu du site.
Les fichiers téléversés vont dans `public/uploads`. Ces deux dossiers ne sont pas versionnés.

## Mise en production (Vercel)

1. **Base de données** : Vercel → projet → *Storage* → *Create Database* → **Neon** → connecter au projet.
2. **Fichiers** : *Storage* → *Create* → **Blob** → connecter au projet.
3. **Variables en local** :
   ```bash
   npx vercel link
   npx vercel env pull .env.local
   ```
4. **Créer les tables et importer le contenu** : `npm run db:setup`
5. **Admin** : `npm run admin:setup`, puis copier `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH_B64` et `SESSION_SECRET`
   dans Vercel → *Settings* → *Environment Variables*.
6. *(Recommandé)* **2FA** : `npm run admin:2fa`, puis ajouter `ADMIN_TOTP_SECRET` dans Vercel.
7. Redéployer, puis se connecter sur `https://<ton-domaine>/admin`.

Sans base configurée en production, le site reste en ligne avec le contenu par défaut (dashboard inactif).

## Sécurité

- Mot de passe haché **Argon2id**, jamais stocké en clair ; comparaison à temps constant.
- Session **JWT HS256** dans un cookie `httpOnly`, `Secure`, `SameSite=Strict`, 8 h ; changer le mot de passe invalide les sessions.
- **Middleware** sur `/admin` + vérification de session dans **chaque** action serveur.
- **Limitation de débit** : 5 échecs de connexion par IP / 15 min (30 au total) ; 5 messages de contact par IP / heure.
- **2FA TOTP** optionnelle.
- Liens filtrés (`http(s)` / chemins internes uniquement) : pas de `javascript:` ; Markdown rendu **sans HTML brut**.
- Formulaire de contact validé (zod), échappé dans l'e-mail, avec pot de miel anti-robots.
- En-têtes de sécurité (HSTS, nosniff, Referrer-Policy, Permissions-Policy, X-Frame-Options) ; `/admin` en `noindex` + `no-store`.

## Scripts

| Commande | Rôle |
| --- | --- |
| `npm run admin:setup` | Définir / changer l'email et le mot de passe admin |
| `npm run admin:2fa` | Activer la double authentification |
| `npm run db:setup` | Créer les tables sur Neon et importer le contenu initial |
| `npm run db:generate` | Générer une migration après modification de `src/lib/db/schema.ts` |
