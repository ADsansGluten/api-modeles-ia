import {Router} from 'express';
import * as controller from '../controllers/ai-model.controller.js';

export const aiModelRoutes = Router();

// Le préfixe /api/ai-models sera ajouté dans app.ts.
aiModelRoutes.get('/', controller.listAiModels);
aiModelRoutes.get('/:id', controller.getAiModel);
aiModelRoutes.post('/', controller.createAiModel);
aiModelRoutes.put('/:id', controller.updateAiModel);
aiModelRoutes.delete('/:id', controller.deleteAiModel);