import { Router } from 'express';
import userRoutes from './user.routes';
import skillRoutes from './skill.routes';
import skillUserRoutes from './skill-user.routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/users/skills', skillUserRoutes);
router.use('/skills', skillRoutes);

export default router;
