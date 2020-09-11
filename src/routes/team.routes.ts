import { TeamController } from '../controllers/team.controller';
import { ErrorRouter } from '../error';
import { auth } from '../middlewares/auth.middleware';

const router = new ErrorRouter();

router.route('/').get(TeamController.getTeams).post(auth, TeamController.createTeam);

router
  .route('/:id')
  .get(TeamController.getTeam)
  .delete(auth, TeamController.deleteTeam)
  .put(auth, TeamController.updateTeamData);

export default router.router;
