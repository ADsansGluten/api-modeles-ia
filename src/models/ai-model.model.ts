// Représente un modèle d'IA tel qu'il est stocké en base et renvoyé par l'API.
export class AiModel {
    constructor(
        public id: number,
        public title: string,
        public editor: string,
        public releaseYear: number,
        public genre: string,
        public rating: number,
    ) {}
}

// Données nécessaires pour créer ou remplacer un modèle (sans l'id, généré par SQLite).
export interface CreateAiModelInput {
    title: string;
    editor: string;
    releaseYear: number;
    genre: string;
    rating: number;
}