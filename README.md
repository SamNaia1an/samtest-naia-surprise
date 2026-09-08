# Sam + Naia — site surprise (V2 avec mode test privé)

Site mobile-first pour une journée d'anniversaire avec :

- écran photo/caméra sans reconnaissance faciale ; la photo peut être partagée par Naia vers WhatsApp ou Messages via la feuille de partage de son téléphone ;
- arrivée animée de Sam avec une lettre ;
- lettre modifiable ;
- cartes verrouillées par heure ;
- première surprise le **27 novembre 2026 à 07:35 (Paris)** ;
- deuxième surprise le **27 novembre 2026 à 15:00 (Paris)** ;
- animations avec Framer Motion ;
- pétales, bouquet, livre cadeau, particules dorées ;
- horloge synchronisée avec le serveur Vercel ;
- **mode test privé de Sam** permettant de simuler 07:35 et 15:00 sans toucher aux vraies heures.

## 1. Lancer en local

```bash
npm install
npm run dev
```

Ouvre ensuite :

`http://localhost:3000`

Pour recommencer l'expérience depuis le début :

`http://localhost:3000/?reset=1`

### Tester le mode Sam en local

Crée un fichier `.env.local` à la racine du projet :

```env
SAM_TEST_KEY=ta-cle-secrete
```

Redémarre ensuite `npm run dev`, puis ouvre :

`http://localhost:3000/?samtest=ta-cle-secrete&reset=1`

Quand tu arrives sur la page des surprises, un panneau **MODE TEST SAM** apparaît avec :

- `Heure réelle`
- `Tester 07:35`
- `Tester 15:00`

`Tester 07:35` débloque uniquement la première surprise.
`Tester 15:00` débloque les deux surprises.

Les vraies heures dans `data/surprises.ts` ne sont jamais modifiées.

## 2. Mettre sur GitHub avec le navigateur

1. Va sur GitHub et connecte-toi.
2. En haut à droite : `+` → `New repository`.
3. Nom : par exemple `sam-naia-surprise`.
4. Mets le dépôt en **Private**.
5. Ne coche pas README / licence si GitHub te le propose.
6. Clique sur `Create repository`.
7. Dans le dépôt vide : `Add file` → `Upload files`.
8. Décompresse le ZIP sur ton Mac.
9. Ouvre le dossier `sam-naia-surprise` et sélectionne **tout son contenu** : `app`, `components`, `data`, `public`, `package.json`, etc.
10. Glisse ces éléments dans la page GitHub.
11. En bas : message de commit, par exemple `Première version du cadeau`.
12. Clique sur `Commit changes`.

À la racine du dépôt GitHub, tu dois voir directement :

- `app`
- `components`
- `data`
- `public`
- `package.json`
- `README.md`

Ne publie pas de fichier `.env.local` contenant ta clé secrète.

## 3. Publier sur Vercel

1. Va sur Vercel.
2. Connecte-toi avec GitHub.
3. `Add New` → `Project`.
4. Cherche ton dépôt `sam-naia-surprise`.
5. Clique sur `Import`.
6. Vérifie que Vercel détecte **Next.js**.
7. Avant `Deploy`, ouvre la section **Environment Variables**.
8. Ajoute :

   - Name : `SAM_TEST_KEY`
   - Value : choisis une vraie clé secrète longue, par exemple une suite de 25 à 40 caractères que toi seul connais.

9. Clique sur `Deploy`.

## 4. Ton lien privé de test

Supposons que ton site soit :

`https://sam-naia-surprise.vercel.app`

et que ta clé Vercel soit :

`UNE_CLE_SECRETE_QUE_TOI_SEUL_CONNAIS`

TON lien de test devient :

`https://sam-naia-surprise.vercel.app/?samtest=UNE_CLE_SECRETE_QUE_TOI_SEUL_CONNAIS&reset=1`

**Ne donne jamais ce lien à Naia.**

Le lien que tu lui enverras le jour J doit être simplement :

`https://sam-naia-surprise.vercel.app`

Elle n'aura donc aucun panneau de test et les cartes suivront les vraies heures.

## 5. Modifier ta lettre

Ouvre :

`data/content.ts`

et remplace `letterText`.

Tu peux aussi modifier les deux messages :

- `finalFlowerMessage`
- `finalBookMessage`

## 6. Les vraies heures de déblocage

Ouvre :

`data/surprises.ts`

Actuellement :

```ts
2026-11-27T07:35:00+01:00
2026-11-27T15:00:00+01:00
```

Le `+01:00` correspond à l'heure de Paris le 27 novembre.

Le mode test **ne change pas ces valeurs**.

## 7. Remplacer les images

Dossier :

`public/assets/`

- `sam.png` : avatar principal de Sam
- `naia.png` : avatar de Naia
- `book-cover.png` : couverture du livre

Tu peux remplacer une image en gardant exactement le même nom.

### Pour rendre les animations encore meilleures

Tu peux ajouter plus tard :

- `sam-letter.png` : Sam avec une enveloppe dans les mains ;
- `sam-flowers.png` : Sam avec un bouquet ;
- `sam-book.png` : Sam tenant le livre.

Le projet actuel fonctionne déjà avec `sam.png` et des objets animés superposés.

## 8. Photo d'identification et partage

Le selfie n'est pas envoyé automatiquement à un serveur. Il est capturé dans le navigateur avec `getUserMedia`.

Après la prise de photo, Naia voit un bouton **« Envoyer la photo à Sam ♡ »**. Sur un téléphone compatible, ce bouton ouvre la feuille de partage native : elle choisit **WhatsApp** ou **Messages**, puis la conversation avec Sam.

Le navigateur ne peut pas sélectionner silencieusement un destinataire à sa place.

Si le partage de fichiers n'est pas supporté, le site enregistre la photo sur le téléphone et demande de l'envoyer manuellement.

Il n'y a aucune reconnaissance faciale et aucune donnée biométrique stockée.

## 9. Important sur la sécurité du mode test

La vraie clé n'est pas enregistrée dans GitHub. Elle est stockée côté serveur dans Vercel sous `SAM_TEST_KEY`.

Le navigateur envoie la clé au serveur uniquement quand tu ouvres un lien contenant `?samtest=...`. Le serveur vérifie la clé avant d'afficher les boutons de simulation.

Garde donc :

- le dépôt GitHub **privé** ;
- ta clé secrète pour toi ;
- ton lien `?samtest=...` pour toi uniquement.
