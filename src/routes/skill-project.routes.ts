import { ErrorRouter } from '../error';
import { auth } from '../middlewares/auth.middleware';
import { SkillProjectController } from '../controllers/skill-project.controller';

const router = new ErrorRouter();

router
  .route('/:id')
  .get(auth, SkillProjectController.getProjectSkills)
  .patch(auth, SkillProjectController.assingSkill)
  .delete(auth, SkillProjectController.removeSkill);

export default router.router;