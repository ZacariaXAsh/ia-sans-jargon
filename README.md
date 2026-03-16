# IA, sans jargon

Landing page Vite pour tester la demande autour d’un projet grand public qui aide à comprendre et utiliser l’IA sans jargon.

## Stack

- Vite
- HTML/CSS/JS statiques
- Vercel pour l’hébergement du frontend
- Vercel Function (`api/waitlist.js`) pour envoyer les emails vers Brevo côté serveur

## Démarrer en local

```bash
npm install
npm run dev
```

## Variables d’environnement

### Frontend (Vite)

Le formulaire lit `VITE_WAITLIST_ENDPOINT` depuis l’environnement Vite.

En production sur Vercel, la valeur la plus simple est :

```bash
VITE_WAITLIST_ENDPOINT=/api/waitlist
```

Le frontend envoie un `POST` JSON avec cette structure :

```json
{
  "email": "person@example.com",
  "source": "landing-page",
  "submittedAt": "2026-03-16T15:00:00.000Z"
}
```

### Backend (Vercel Function)

Configurer aussi ces variables d’environnement sur Vercel :

```bash
BREVO_API_KEY=your_brevo_api_key
BREVO_LIST_ID=123
```

## Endpoint waitlist

Le endpoint `api/waitlist.js` :

- accepte uniquement `POST`
- valide l’email côté serveur
- ajoute ou met à jour le contact dans Brevo avec `updateEnabled: true`
- utilise seulement `BREVO_API_KEY` et `BREVO_LIST_ID` côté serveur
- retourne des réponses JSON propres (`{ ok: true }` en succès)

Le body envoyé à Brevo contient au minimum :

```json
{
  "email": "person@example.com",
  "listIds": [123],
  "updateEnabled": true
}
```

## Build de production

```bash
npm run build
npm run preview
```

## Test local rapide

### Frontend seul

Sans `VITE_WAITLIST_ENDPOINT`, le formulaire reste en mode démo et enregistre les emails dans `localStorage` sous la clé `iaSansJargonWaitlistDemo`.

### Test end-to-end du vrai endpoint

Le plus simple est d’utiliser Vercel en local pour servir à la fois le frontend et `api/waitlist.js` avec les mêmes variables d’environnement :

```bash
npm run build
vercel dev
```

Puis tester l’endpoint :

```bash
curl -X POST http://localhost:3000/api/waitlist \
  -H 'Content-Type: application/json' \
  -d '{"email":"test@example.com","source":"landing-page","submittedAt":"2026-03-16T15:00:00.000Z"}'
```

Réponse attendue :

```json
{ "ok": true }
```

## Déploiement Vercel

Si le repo GitHub est connecté à Vercel, un push sur `main` déclenche normalement un nouveau déploiement automatiquement.

Commande manuelle si besoin :

```bash
npm run build
vercel --prod
```

## Notes

- La clé Brevo reste côté serveur et n’est jamais exposée au bundle frontend.
- `source` et `submittedAt` sont acceptés par le frontend/backend, mais ne sont pas envoyés à Brevo par défaut pour éviter de dépendre d’attributs custom fragiles.
