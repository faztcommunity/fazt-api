import { Router } from 'express';
import userRoutes from './user.routes';
import skillRoutes from './skill.routes';
import skillUserRoutes from './skill-user.routes';
import collaboratorsRoutes from './collaborators.routes'
import rolRoutes from './rol.routes'
import categoryRoutes from './category.routes'

const router = Router();

router.use('/users', userRoutes);
router.use('/users/skills', skillUserRoutes);
router.use('/skills', skillRoutes);
router.use('/collaborators', collaboratorsRoutes);
router.use('/roles', rolRoutes);
router.use('/categories', categoryRoutes);

export default router;