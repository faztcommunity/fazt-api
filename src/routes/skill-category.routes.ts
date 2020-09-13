import { ErrorRouter } from '../error';
import { auth } from '../middlewares/auth.middleware';
import { SkillCategoryController } from '../controllers/skill-category.controller';

const router = new ErrorRouter();

router
  .route('/:id')
  .get(auth, SkillCategoryController.getSkillCategories)
  .patch(auth, SkillCategoryController.assingCategory)
  .delete(auth, SkillCategoryController.removeCategory);

export default router.router;