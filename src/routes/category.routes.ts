import { CategoryController } from '../controllers/category.controller';
import { ErrorRouter } from '../error';

const router = new ErrorRouter();

router.route('/').get(CategoryController.getCategories).post(CategoryController.createCategory);

router
  .route('/:id')
  .get(CategoryController.getCategory)
  .delete(CategoryController.deleteCategory)
  .put(CategoryController.updateCategoryData);

export default router.router;
