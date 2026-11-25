import {personnesDb} from '../database/personnes-database.js';
import type {Personne} from '../models/personne.model.js';

// Colonnes à lire, renommées en camelCase pour correspondre au type Personne.
const SELECT_COLUMNS = 'id, first_name AS firstName, last_name AS lastName, favorite_model_id AS favoriteModelId';

// Récupérer toutes les personnes.
export function findAll(): Personne[] {
    return personnesDb.prepare(`SELECT ${SELECT_COLUMNS} FROM personnes ORDER BY id`).all() as Personne[];
}

// Récupérer une personne par son identifiant (undefined si elle n'existe pas).
export function findById(id: number): Personne | undefined {
    return personnesDb.prepare(`SELECT ${SELECT_COLUMNS} FROM personnes WHERE id = ?`).get(id) as Personne | undefined;
}