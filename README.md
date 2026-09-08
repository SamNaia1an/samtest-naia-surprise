# Sam + Naia — site surprise

Site mobile-first pour une journée d'anniversaire avec :

- écran photo/caméra sans reconnaissance faciale ; la photo peut être partagée par Naia vers WhatsApp ou Messages via la feuille de partage de son téléphone ;
- arrivée animée de Sam avec une lettre ;
- lettre modifiable ;
- cartes verrouillées par heure ;
- première surprise le **27 novembre 2026 à 07:35 (Paris)** ;
- deuxième surprise le **27 novembre 2026 à 15:00 (Paris)** ;
- animations avec Framer Motion ;
- pétales, bouquet, livre cadeau, particules dorées ;
- horloge synchronisée avec le serveur Vercel.

## 1. Lancer en local

```bash
npm install
npm run dev
```

Ouvre ensuite `http://localhost:3000`.

Pour recommencer l'expérience depuis le début :

`http://localhost:3000/?reset=1`

## 2. Mettre sur GitHub

1. Crée un dépôt **privé** sur GitHub.
2. Décompresse ce projet.
3. Dans le dossier :

```bash
git init
git add .
git commit -m "Site surprise Naia"
git branch -M main
git remote add origin TON_URL_GITHUB
git push -u origin main
```

## 3. Publier sur Vercel

1. Connecte-toi à Vercel avec GitHub.
2. `Add New` → `Project`.
3. Sélectionne ce dépôt.
4. Clique sur `Deploy`.

La caméra fonctionnera sur Vercel car le site est en HTTPS.

## 4. Modifier ta lettre

Ouvre :

`data/content.ts`

et remplace `letterText`.

Tu peux aussi modifier les deux messages :

- `finalFlowerMessage`
- `finalBookMessage`

## 5. Modifier les heures

Ouvre :

`data/surprises.ts`

Actuellement :

```ts
2026-11-27T07:35:00+01:00
2026-11-27T15:00:00+01:00
```

Le `+01:00` correspond à l'heure de Paris le 27 novembre.

## 6. Remplacer les images

Dossier :

`public/assets/`

- `sam.png` : avatar principal de Sam
- `naia.png` : avatar de Naia
- `book-cover.png` : couverture du livre

Tu peux remplacer un fichier par une nouvelle image en gardant **exactement le même nom**.

### Pour un résultat encore plus parfait

Le code fonctionne déjà avec les images fournies. Mais pour que Sam semble vraiment **tenir** les objets plutôt que de les avoir superposés par animation CSS, tu peux ajouter plus tard :

- `sam-letter.png` : Sam avec une enveloppe dans les mains ;
- `sam-flowers.png` : Sam avec un bouquet ;
- `sam-book.png` : Sam tenant le livre.

Le projet actuel utilise `sam.png` + des objets animés superposés, donc il fonctionne sans ces trois fichiers.

## Photo d’identification et partage

Le selfie n'est pas envoyé automatiquement à un serveur. Il est capturé dans le navigateur avec `getUserMedia`. Après la prise de photo, Naia voit un bouton **« Envoyer la photo à Sam ♡ »**. Sur un téléphone compatible, ce bouton ouvre la feuille de partage native : elle choisit **WhatsApp** ou **Messages**, puis la conversation avec Sam. Le navigateur ne peut pas sélectionner silencieusement un destinataire à sa place.

Si le partage de fichiers n'est pas supporté, le site enregistre la photo sur le téléphone et demande de l'envoyer manuellement. Il n'y a **aucune reconnaissance faciale** et aucune donnée biométrique stockée.

## Important sur les surprises

Le site utilise `/api/time` pour synchroniser l'heure avec le serveur afin d'éviter que le déblocage dépende uniquement de l'heure réglée sur le téléphone.

Garde le dépôt GitHub **privé** si tu ne veux pas que les textes ou les heures des surprises puissent être vus avant le jour J.

## Comportement de l'identification à chaque visite

Cette version est configurée pour recommencer **depuis l'identification photo à chaque ouverture ou rechargement du site**.

- aucune progression n'est enregistrée dans `localStorage` ;
- pendant une même visite, Naia peut passer de l'identification à la lettre puis aux surprises normalement ;
- dès qu'elle ferme puis rouvre le site, ou recharge la page, le processus recommence à l'étape photo.
