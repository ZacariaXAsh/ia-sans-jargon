# IA, sans jargon

Landing page Vite statique pour tester la demande autour d’un projet grand public qui aide à comprendre et utiliser l’IA sans jargon.

## Stack

- Vite
- HTML/CSS/JS statiques
- Déploiement Vercel via `dist/`

## Démarrer en local

```bash
npm install
npm run dev
```

## Build de production

```bash
npm run build
npm run preview
```

## Déploiement Vercel

Le projet est prêt pour un déploiement statique sur Vercel avec `vercel.json`.

```bash
npm run build
vercel --prod
```

> Si le CLI Vercel n’est pas installé ou authentifié, il suffit d’importer le repo GitHub dans Vercel, ou d’installer le CLI puis de se connecter.

## Intégration email / waitlist

Le formulaire lit `VITE_WAITLIST_ENDPOINT` depuis l’environnement Vite.

Exemple :

```bash
VITE_WAITLIST_ENDPOINT=https://example.com/api/waitlist
```

Le frontend envoie un `POST` JSON avec cette structure :

```json
{
  "email": "person@example.com",
  "source": "landing-page",
  "submittedAt": "2026-03-16T15:00:00.000Z"
}
```

### Comportement actuel

- **Si `VITE_WAITLIST_ENDPOINT` est défini** : le formulaire envoie les emails en mode live.
- **Si `VITE_WAITLIST_ENDPOINT` est vide** : le formulaire fonctionne en mode démo et enregistre localement l’email dans `localStorage` sous la clé `iaSansJargonWaitlistDemo`.

## Recommandation email

Pour aller vite ensuite, le meilleur choix pratique est **Brevo** :

- très rapide à brancher
- bon fit pour un produit francophone
- API simple + formulaires/listes/automations
- Vercel-friendly si on veut interposer un endpoint plus tard

Alternative si priorité absolue au confort développeur : **Loops**.
