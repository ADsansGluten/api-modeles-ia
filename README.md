# API Modèles IA

API REST CRUD pour gérer une collection de modèles d'intelligence artificielle.
Projet réalisé avec TypeScript, Node.js, Express et SQLite, dans le cadre du TP noté « Bases API / CRUD ».

> Le sujet du TP (collection de jeux vidéo) a été remplacé par une collection de modèles d'IA.
> Les cinq opérations demandées et l'architecture sont inchangées.

## Prérequis

- Node.js (version récente)
- npm

## Installation et lancement

```bash
npm install
npm run dev
```

L'API démarre sur `http://localhost:3000`. Le port peut être changé avec la variable d'environnement `PORT`.
La base SQLite est créée automatiquement au démarrage à partir de `src/database/schema.sql`.

Autres commandes :

- `npm run build` compile le TypeScript dans `dist/`
- `npm start` lance la version compilée

## Routes

| Méthode | Chemin               | Description                | Succès |
|---------|----------------------|----------------------------|--------|
| GET     | `/api/ai-models`     | Lister tous les modèles    | 200    |
| GET     | `/api/ai-models/:id` | Récupérer un modèle        | 200    |
| POST    | `/api/ai-models`     | Ajouter un modèle          | 201    |
| PUT     | `/api/ai-models/:id` | Modifier un modèle         | 200    |
| DELETE  | `/api/ai-models/:id` | Supprimer un modèle        | 204    |

Erreurs : `400` (données ou identifiant invalides, JSON mal formé), `404` (modèle introuvable), `500` (erreur interne).

Exemple de corps pour `POST` et `PUT` :

```json
{
  "title": "Claude 3 Opus",
  "editor": "Anthropic",
  "releaseYear": 2024,
  "genre": "LLM",
  "rating": 9
}
```

## Documentation et tests

- Documentation OpenAPI : `docs/openapi.yaml`, affichée par Swagger UI sur `http://localhost:3000/api/docs`
- Collection Bruno : dossier `docs/bruno` (ouvrir le dossier comme collection dans Bruno, choisir l'environnement `Local`, puis lancer le Runner). 13 requêtes : 7 scénarios nominaux et 6 cas d'erreur.

## Architecture

```text
src/
├── config/         configuration (chemins)
├── controllers/    lecture des requêtes, construction des réponses HTTP
├── database/       connexion SQLite et schéma (schema.sql)
├── models/         modèle AiModel et type CreateAiModelInput
├── repositories/   requêtes SQL (requêtes préparées)
├── routes/         association méthodes/chemins HTTP et contrôleurs
├── services/       règles métier et validation des données
├── app.ts          configuration d'Express, Swagger UI, gestion des erreurs
└── server.ts       démarrage du serveur HTTP
```

## Choix techniques

- Architecture en couches : chaque couche a une seule responsabilité.
- Requêtes SQL préparées (`better-sqlite3`) contre l'injection SQL.
- Validation des données dans la couche service, avec des erreurs HTTP explicites.
- `"types": ["node"]` ajouté dans `tsconfig.json`, car TypeScript 6 ne charge plus les types Node automatiquement.