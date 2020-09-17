import { CategoryController } from '../controllers/category.controller';
import { ErrorRouter } from '../error';
import { auth } from '../middlewares/auth.middleware';
import { categoryCategoryValidator } from '../validators/category.validators';
const router = new ErrorRouter();

router
  .route('/')
  .get(auth, CategoryController.getCategories)
  .post(auth, categoryCategoryValidator, CategoryController.createCategory);

router
  .route('/:id')
  .get(auth, CategoryController.getCategory)
  .delete(auth, CategoryController.deleteCategory)
  .put(auth, CategoryController.updateCategoryData);

export default router.router;
