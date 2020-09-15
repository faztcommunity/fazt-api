import { ErrorRouter } from '../error';
import { auth } from '../middlewares/auth.middleware';
import { CategoryProjectController } from '../controllers/project-category.controller';

const router = new ErrorRouter();

router
  .route('/:id')
  .get(auth, CategoryProjectController.getProjectCategories)
  .patch(auth, CategoryProjectController.assingCategory)
  .delete(auth, CategoryProjectController.removeCategory);

export default router.router;
