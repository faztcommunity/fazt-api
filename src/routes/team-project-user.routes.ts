import { ErrorRouter } from '../error';
import { auth } from '../middlewares/auth.middleware';
import { TeamProjectUserController } from '../controllers/team-project-user.controller';

const router = new ErrorRouter();

router
  .route('/:id')
  .get(auth, TeamProjectUserController.getProjectUser)
  .patch(auth, TeamProjectUserController.assingProjectUser)
  .delete(auth, TeamProjectUserController.removeProjectUser);

export default router.router;
