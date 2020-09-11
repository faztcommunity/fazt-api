import { Router } from 'express';
import {
  getCollaborators,
  createCollaborator
} from '../controllers/collaborators.controller';

const router = Router();

router.get('/', getCollaborators);

router.post('/', createCollaborator);

export default router;
