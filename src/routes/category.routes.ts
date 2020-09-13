import { CategoryController } from '../controllers/category.controller';
import { ErrorRouter } from '../error';
import { auth } from '../middlewares/auth.middleware';

const router = new ErrorRouter();

router
  .route('/')
  .get(CategoryController.getCategories)
  .post(auth, CategoryController.createCategory);

router
  .route('/:id')
  .get(auth, CategoryController.getCategory)
  .delete(auth, CategoryController.deleteCategory)
  .put(auth, CategoryController.updateCategoryData);

export default router.router;
