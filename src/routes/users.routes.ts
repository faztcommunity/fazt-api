import { Router } from 'express';
import * as userCtrl from '../controllers/user.controller';
import { checkAuth } from '../auth/auth.middleware';
import { handlerExceptionRoute } from '../error';

const router = Router();

router
  .route('/')
  .get(handlerExceptionRoute(userCtrl.getUsers))
  .post(handlerExceptionRoute(userCtrl.createUser));

router
  .route('/:id')
  .get(userCtrl.getUser)
  .put(checkAuth('updateOrDelete'), handlerExceptionRoute(userCtrl.updateUser))
  .delete(
    checkAuth('updateOrDelete'),
    handlerExceptionRoute(userCtrl.deleteUser)
  );

router.route('/signin').post(handlerExceptionRoute(userCtrl.signinUser));

export default router;
