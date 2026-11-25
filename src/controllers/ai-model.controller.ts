import type {Request, Response} from 'express';
import * as service from '../services/ai-model.service.js';

// GET /api/ai-models : renvoie tous les modèles (200).
export function listAiModels(_req: Request, res: Response) {
    res.status(200).json(service.getAll());
}

// GET /api/ai-models/:id : renvoie un modèle (200).
export function getAiModel(req: Request, res: Response) {
    res.status(200).json(service.getById(String(req.params.id)));
}

// POST /api/ai-models : crée un modèle (201).
export function createAiModel(req: Request, res: Response) {
    res.status(201).json(service.create(req.body));
}

// PUT /api/ai-models/:id : remplace un modèle (200).
export function updateAiModel(req: Request, res: Response) {
    res.status(200).json(service.update(String(req.params.id), req.body));
}

// DELETE /api/ai-models/:id : supprime un modèle (204, sans corps).
export function deleteAiModel(req: Request, res: Response) {
    service.remove(String(req.params.id));
    res.status(204).send();
}