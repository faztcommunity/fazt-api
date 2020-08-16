import { Router } from 'express';
import userRoutes from './user.routes';
import skillRoutes from './skill.routes';

const router = Router();

router.use('/users', userRoutes);

router.use('/skills', skillRoutes);

export default router;
