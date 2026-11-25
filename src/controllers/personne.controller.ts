import type {Request, Response} from 'express';
import * as service from '../services/personne.service.js';

// GET /api/personnes : toutes les personnes avec leur modèle favori.
export function listPersonnes(_req: Request, res: Response): void {
    res.status(200).json(service.getAll());
}

// GET /api/personnes/:id : une personne avec son modèle favori.
export function getPersonne(req: Request, res: Response): void {
    res.status(200).json(service.getById(String(req.params.id)));
}