import { TeamController } from '../controllers/team.controller';
import { ErrorRouter } from '../error';

const router = new ErrorRouter();

router.route('/').get(TeamController.getTeams).post(TeamController.createTeam);

router
  .route('/:id')
  .get(TeamController.getTeam)
  .delete(TeamController.deleteTeam)
  .put(TeamController.updateTeamData);

export default router.router;
