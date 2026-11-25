import * as repository from '../repositories/ai-model.repository.js';
import type {AiModel, CreateAiModelInput} from '../models/ai-model.model.js';

// Erreur avec un code HTTP, utilisée par le gestionnaire d'erreurs de app.ts.
export class HttpError extends Error {
    constructor(
        public status: number,
        message: string,
        public details?: string[],
    ) {
        super(message);
        this.name = 'HttpError';
    }
}

// Vérifie que l'identifiant est un entier strictement positif.
export function parseId(value: string): number {
    if (!/^[1-9]\d*$/.test(value) || !Number.isSafeInteger(Number(value))) {
        throw new HttpError(400, 'Identifiant invalide', ['L\'identifiant doit être un entier strictement positif']);
    }
    return Number(value);
}

// Vérifie les données reçues (le client peut envoyer n'importe quoi).
function validateInput(body: unknown): CreateAiModelInput {
    const data = (typeof body === 'object' && body !== null ? body : {}) as Record<string, unknown>;
    const errors: string[] = [];

    const title = typeof data.title === 'string' ? data.title.trim() : '';
    const editor = typeof data.editor === 'string' ? data.editor.trim() : '';
    const genre = typeof data.genre === 'string' ? data.genre.trim() : '';
    const {releaseYear, rating} = data;

    if (title === '') errors.push('Le titre est obligatoire');
    if (editor === '') errors.push('L\'éditeur est obligatoire');
    if (genre === '') errors.push('Le genre est obligatoire');
    if (typeof releaseYear !== 'number' || !Number.isInteger(releaseYear) || releaseYear < 1950 || releaseYear > 2100) {
        errors.push('L\'année de sortie doit être un entier compris entre 1950 et 2100');
    }
    if (typeof rating !== 'number' || !Number.isFinite(rating) || rating < 0 || rating > 10) {
        errors.push('La note doit être comprise entre 0 et 10');
    }

    if (errors.length > 0) {
        throw new HttpError(400, 'Données invalides', errors);
    }
    return {title, editor, genre, releaseYear: releaseYear as number, rating: rating as number};
}

export function getAll(): AiModel[] {
    return repository.findAll();
}

export function getById(idParam: string): AiModel {
    const model = repository.findById(parseId(idParam));
    if (!model) throw new HttpError(404, 'Modèle introuvable');
    return model;
}

export function create(body: unknown): AiModel {
    return repository.create(validateInput(body));
}

export function update(idParam: string, body: unknown): AiModel {
    const id = parseId(idParam);
    if (!repository.findById(id)) throw new HttpError(404, 'Modèle introuvable');
    const updated = repository.update(id, validateInput(body));
    if (!updated) throw new HttpError(404, 'Modèle introuvable');
    return updated;
}

export function remove(idParam: string): void {
    const id = parseId(idParam);
    if (!repository.remove(id)) throw new HttpError(404, 'Modèle introuvable');
}