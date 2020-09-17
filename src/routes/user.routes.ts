import { UserController } from '../controllers/user.controller';
import { ErrorRouter } from '../error';
import { auth, isAdmin } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validator.middleware';
import { signUpValidator, logInValidator } from '../validators/users.validators';

const router = new ErrorRouter();

router
  .route('/')
  .get(UserController.getUsers)
  .post(validate(signUpValidator), UserController.createUser)
  .delete(auth, UserController.deleteUser)
  .put(auth, UserController.updateUserData);

router.post('/login', validate(logInValidator), UserController.logIn);

export default router.router;
