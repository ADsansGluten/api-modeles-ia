import {Router} from 'express';
import * as controller from '../controllers/personne.controller.js';

export const personneRoutes = Router();

personneRoutes.get('/', controller.listPersonnes);
personneRoutes.get('/:id', controller.getPersonne);