import * as personneRepository from '../repositories/personne.repository.js';
import * as aiModelRepository from '../repositories/ai-model.repository.js';
import type {AiModel} from '../models/ai-model.model.js';
import type {Personne} from '../models/personne.model.js';
import {HttpError, parseId} from './ai-model.service.js';

// Une personne avec les détails de son modèle favori (pris dans l'autre base).
export interface PersonneWithModel {
    id: number;
    firstName: string;
    lastName: string;
    favoriteModel: AiModel | null;
}

// Assemble les données des deux bases en un seul objet.
function withModel(personne: Personne, model: AiModel | undefined): PersonneWithModel {
    return {
        id: personne.id,
        firstName: personne.firstName,
        lastName: personne.lastName,
        favoriteModel: model ?? null,
    };
}

// Toutes les personnes, avec leur modèle favori.
export function getAll(): PersonneWithModel[] {
    const personnes = personneRepository.findAll();

    // Une seule lecture de la base des modèles, rangée par id pour un accès rapide.
    const modelsById = new Map(
        aiModelRepository.findAll().map((model): [number, AiModel] => [model.id, model]),
    );

    return personnes.map((personne) => {
        const model = personne.favoriteModelId === null ? undefined : modelsById.get(personne.favoriteModelId);
        return withModel(personne, model);
    });
}

// Une personne précise, avec son modèle favori.
export function getById(idParam: string): PersonneWithModel {
    const personne = personneRepository.findById(parseId(idParam));
    if (!personne) throw new HttpError(404, 'Personne introuvable');

    const model = personne.favoriteModelId === null ? undefined : aiModelRepository.findById(personne.favoriteModelId);
    return withModel(personne, model);
}