import { ErrorRouter } from '../error';
import { auth } from '../middlewares/auth.middleware';
import { ProjectTeamController } from '../controllers/project-team.controller';

const router = new ErrorRouter();

router
  .route('/')
  .get(auth, ProjectTeamController.getProjectTeam)
  .patch(auth, ProjectTeamController.assingProject)
  .delete(auth, ProjectTeamController.removeProject);

export default router.router;
