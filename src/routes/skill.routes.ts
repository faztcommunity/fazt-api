import { SkillController } from '../controllers/skill.controller';
import { ErrorRouter } from '../error';
import { auth } from '../middlewares/auth.middleware';
const router = new ErrorRouter();

router.route('/').get(SkillController.getSkills).post(auth, SkillController.createSkill);

router
  .route('/:id')
  .get(SkillController.getSkill)
  .delete(auth, SkillController.deleteSkill)
  .put(auth, SkillController.updateSkillData);

export default router.router;
