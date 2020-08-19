import { SkillController } from '../controllers/skill.controller';
import { ErrorRouter } from '../error';

const router = new ErrorRouter();

router
  .route('/')
  .get(SkillController.getSkills)
  .post(SkillController.createSkill);

router
  .route('/:id')
  .get(SkillController.getSkill)
  .delete(SkillController.deleteSkill)
  .put(SkillController.updateSkillData);

export default router.router;
