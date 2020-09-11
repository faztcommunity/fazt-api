import { Router } from 'express';
import {
  getCollaborators,
  createCollaborator,
  getOneCollaborator,
  deleteOneCollaborator,
} from '../controllers/collaborators.controller';

const router = Router();

router.get('/', getCollaborators);

router.post('/', createCollaborator);

router.get('/:id', getOneCollaborator);

router.delete('/:id', deleteOneCollaborator);


export default router;
