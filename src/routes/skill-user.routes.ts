import { ErrorRouter } from '../error';
import { auth } from '../middlewares/auth.middleware';
import { SkillUserController } from '../controllers/skill-user.controller';

const router = new ErrorRouter();

router
  .route('/')
  .get(auth, SkillUserController.getUserSkills)
  .patch(auth, SkillUserController.assingSkill)
  .delete(auth, SkillUserController.removeSkill);

export default router.router;
