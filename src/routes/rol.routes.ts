import { RolController } from '../controllers/rol.controller';
import { ErrorRouter } from '../error';

const router = new ErrorRouter();

router.route('/').get(RolController.getRoles).post(RolController.createRol);

router
  .route('/:id')
  .get(RolController.getRol)
  .delete(RolController.deleteRol)
  .put(RolController.updateRolData);

export default router.router;
