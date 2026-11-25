import {db} from '../database/database.js';
import {AiModel} from '../models/ai-model.model.js';
import type {CreateAiModelInput} from '../models/ai-model.model.js';

// Colonnes à lire. « release_year AS releaseYear » renomme la colonne SQL
// pour que chaque ligne ait directement la forme de la classe AiModel.
const SELECT_COLUMNS = 'id, title, editor, release_year AS releaseYear, genre, rating';

// Récupérer tous les modèles.
export function findAll(): AiModel[] {
    return db.prepare(`SELECT ${SELECT_COLUMNS} FROM ai_models ORDER BY id`).all() as AiModel[];
}

// Récupérer un modèle par son identifiant (undefined s'il n'existe pas).
export function findById(id: number): AiModel | undefined {
    return db.prepare(`SELECT ${SELECT_COLUMNS} FROM ai_models WHERE id = ?`).get(id) as AiModel | undefined;
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