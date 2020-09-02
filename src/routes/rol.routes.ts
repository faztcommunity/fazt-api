import { ErrorRouter } from '../error';

import { RolController } from '../controllers/rol.controller';

const router = new ErrorRouter();

router.route('/').post(RolController.createRol);

export default router.router;
