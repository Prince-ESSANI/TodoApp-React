# EXO Frontend — Exercices React

Ce dépôt contient trois applications React indépendantes réalisées avec Vite.

---

## Prérequis

- [Node.js](https://nodejs.org/) v18 ou supérieur
- npm

---

## Applications

### 1. TodoApp — Liste de tâches

Application de gestion de tâches (ajouter, cocher, supprimer).

```bash
cd TodoApp
npm install
npm run dev
```

Accès : http://localhost:5173

---

### 2. EXO Contacts — Gestionnaire de contacts

Application CRUD de gestion de contacts avec stockage dans le `localStorage`.

```bash
cd "EXO Contacts/exo contact"
npm install
npm run dev
```

Accès : http://localhost:5173

---

### 3. Mini Blog — Espace Membre

Application multi-pages avec authentification JWT, gestion d'articles (créer, modifier, supprimer) et routes protégées.

**Nécessite un backend Node.js** en cours d'exécution sur `http://localhost:3000`.

```bash
cd mini-blog
npm install
npm run dev
```

Accès : http://localhost:5173

#### Routes disponibles

| Chemin | Accès | Description |
|--------|-------|-------------|
| `/` | Public | Liste de tous les articles |
| `/article/:id` | Public | Détail d'un article |
| `/login` | Public | Formulaire de connexion |
| `/register` | Public | Formulaire d'inscription |
| `/create` | Privé | Créer un article |
| `/edit/:id` | Privé (auteur) | Modifier un article |
| `/my-articles` | Privé | Mes articles |
| `*` | Public | Page 404 |

---

## Structure du dépôt

```
.
├── TodoApp/
├── EXO Contacts/
│   └── exo contact/
└── mini-blog/
```

> Chaque application est indépendante. Les `node_modules` ne sont pas inclus dans le dépôt — exécuter `npm install` dans chaque dossier avant de lancer.
