import { Router } from 'express';
import userRoutes from './user.routes';
import skillRoutes from './skill.routes';
import skillUserRoutes from './skill-user.routes';
import collaboratorsRoutes from './collaborators.routes';
import rolRoutes from './rol.routes';
import categoryRoutes from './category.routes';
import teamRoutes from './team.routes';
import socialMediaRoutes from './social-media.routes';
import socialMediaUserRoutes from './social-media-user.routes';
import RolUserRoutes from './rol-user.routes';
import ProjectRoutes from './project.routes';
import ProjectUserRoutes from './project-user.routes';
import ProjectTeamRoutes from './project-team.routes';
import CategoryProjectRoutes from './category-project.routes';
import SkillProjectRoutes from './skill-project.routes';
import SkillCategoryRoutes from './skill-category.routes';

const router = Router();

router.use('/users/skills', skillUserRoutes);
router.use('/users/social-medias', socialMediaUserRoutes);
router.use('/users/roles', RolUserRoutes);
router.use('/projects/users', ProjectUserRoutes);
router.use('/skills/categories', SkillCategoryRoutes);
router.use('/projects/categories', CategoryProjectRoutes);
router.use('/skills/projects', SkillProjectRoutes);
router.use('/projects/teams', ProjectTeamRoutes);
router.use('/users', userRoutes);
router.use('/social-medias', socialMediaRoutes);
router.use('/skills', skillRoutes);
router.use('/roles', rolRoutes);
router.use('/collaborators', collaboratorsRoutes);
router.use('/projects', ProjectRoutes);
router.use('/categories', categoryRoutes);
router.use('/teams', teamRoutes);

export default router;
