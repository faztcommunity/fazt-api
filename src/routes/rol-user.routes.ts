import { ErrorRouter } from '../error';
import { auth } from '../middlewares/auth.middleware';
import { RolUserController } from '../controllers/rol-user.controller';

const router = new ErrorRouter();

router
  .route('/')
  .get(auth, RolUserController.getUserRoles)
  .patch(auth, RolUserController.assingRol)
  .delete(auth, RolUserController.removeRol);

export default router.router;
