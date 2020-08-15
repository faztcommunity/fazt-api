import { UserController } from '../controllers/user.controller';
import { ErrorRouter } from '../error';
import { auth } from '../middlewares/auth.middleware';

const router = new ErrorRouter();

router
  .route('/')
  .get(UserController.getUsers)
  .post(UserController.createUser)
  .delete(auth, UserController.deleteUser)
  .put(auth, UserController.updateUserData);

router.post('/login', UserController.logIn);

export default router.router;
