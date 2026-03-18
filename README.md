# IA, sans jargon

Site éditorial Astro pour expliquer l’IA à des débutants prudents, avec une vraie homepage de contenu, des articles, un petit glossaire, et une waitlist Brevo conservée.

## Stack actuelle

- Astro
- Astro Content Collections (`pages`, `articles`, `glossary`)
- Markdown / MDX pour le contenu
- CSS tokenisé maison pour le thème éditorial
- Vercel pour l’hébergement statique
- Vercel Function `api/waitlist.js` pour la waitlist Brevo

Le repo vise désormais une seule direction visible : **Astro éditorial + contenu + waitlist serveur**.
L’ancienne landing Vite et le drift Tamagui/React ne font plus partie de la surface active.

## Pourquoi pas Tamagui tout de suite ?

Le repo est déjà parti dans une bonne direction content-first avec Astro :

- pages éditoriales statiques rapides
- contenu facile à écrire et relire
- glossaire branché au contenu
- waitlist déjà isolée côté serveur

Ajouter Tamagui maintenant impliquerait d’introduire la couche React/Tamagui dans un repo qui n’en a pas besoin pour livrer la V1 éditoriale. Le compromis retenu dans le code est donc :

- garder Astro comme socle V1
- renforcer le thème avec des tokens et des composants visuels réutilisables
- préserver une migration possible plus tard si une vraie app React/web ou mobile devient nécessaire

## Structure utile

- `src/pages/` — routes Astro
- `src/components/` — composants UI et navigation
- `src/content/` — contenu éditorial et glossaire
- `src/styles/` — thème CSS global + tokens
- `api/waitlist.js` — endpoint Vercel vers Brevo
- `content-drafts/` — brouillons hors build (ignorés par git pour ne pas polluer la review)

## Démarrer en local

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Waitlist

Le frontend lit :

```bash
PUBLIC_WAITLIST_ENDPOINT=/api/waitlist
```

ou, si besoin, la variable historique :

```bash
VITE_WAITLIST_ENDPOINT=/api/waitlist
```

La fonction serveur attend aussi :

```bash
BREVO_API_KEY=your_brevo_api_key
BREVO_LIST_ID=123
```

Sans endpoint configuré, le formulaire passe en mode démo et stocke localement les emails pour ne pas bloquer le travail front.

## Déploiement

Si le repo est connecté à Vercel, un push sur `main` suffit normalement.
