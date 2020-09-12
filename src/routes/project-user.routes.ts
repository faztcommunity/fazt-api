import { ErrorRouter } from '../error';
import { auth } from '../middlewares/auth.middleware';
import { ProjectUserController } from '../controllers/project-user.controller';

const router = new ErrorRouter();

router
  .route('/')
  .get(auth, ProjectUserController.getProjectUser)
  .patch(auth, ProjectUserController.assingProject)
  .delete(auth, ProjectUserController.removeProject);

export default router.router;
