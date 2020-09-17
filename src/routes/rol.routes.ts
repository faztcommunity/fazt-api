import { RolController } from '../controllers/rol.controller';
import { ErrorRouter } from '../error';
import { auth } from '../middlewares/auth.middleware';
import { createRolValidator } from '../validators/rol.validators';

const router = new ErrorRouter();

router
  .route('/')
  .get(RolController.getRoles)
  .post(auth, createRolValidator, RolController.createRol);

router
  .route('/:id')
  .get(RolController.getRol)
  .delete(auth, RolController.deleteRol)
  .put(auth, RolController.updateRolData);

export default router.router;
