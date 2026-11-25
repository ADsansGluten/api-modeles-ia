import {db} from '../database/database.js';
import {AiModel} from '../models/ai-model.model.js';
import type {CreateAiModelInput} from '../models/ai-model.model.js';

// Une ligne telle que SQLite la renvoie (noms de colonnes en snake_case).
interface AiModelRow {
    id: number;
    title: string;
    editor: string;
    release_year: number;
    genre: string;
    rating: number;
}

// Convertit une ligne SQL (release_year) en objet TypeScript (releaseYear).
function toAiModel(row: AiModelRow): AiModel {
    return new AiModel(row.id, row.title, row.editor, row.release_year, row.genre, row.rating);
}

// Récupérer tous les modèles.
export function findAll(): AiModel[] {
    const rows = db.prepare('SELECT * FROM ai_models ORDER BY id').all() as AiModelRow[];
    return rows.map(toAiModel);
}

// Récupérer un modèle par son identifiant (undefined s'il n'existe pas).
export function findById(id: number): AiModel | undefined {
    const row = db.prepare('SELECT * FROM ai_models WHERE id = ?').get(id) as AiModelRow | undefined;
    return row ? toAiModel(row) : undefined;
}

// Ajouter un modèle et le renvoyer avec son id généré.
export function create(input: CreateAiModelInput): AiModel {
    const result = db.prepare(
        'INSERT INTO ai_models (title, editor, release_year, genre, rating) VALUES (@title, @editor, @releaseYear, @genre, @rating)'
    ).run(input);
    return new AiModel(Number(result.lastInsertRowid), input.title, input.editor, input.releaseYear, input.genre, input.rating);
}

// Modifier un modèle. Renvoie undefined si l'id n'existe pas.
export function update(id: number, input: CreateAiModelInput): AiModel | undefined {
    const result = db.prepare(
        'UPDATE ai_models SET title = @title, editor = @editor, release_year = @releaseYear, genre = @genre, rating = @rating WHERE id = @id'
    ).run({...input, id});
    if (result.changes === 0) return undefined;
    return findById(id);
}

// Supprimer un modèle. Renvoie true si une ligne a été supprimée.
export function remove(id: number): boolean {
    const result = db.prepare('DELETE FROM ai_models WHERE id = ?').run(id);
    return result.changes > 0;
} 