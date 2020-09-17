import { ProjectController } from '../controllers/project.controller';
import { ErrorRouter } from '../error';
import { auth } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validator.middleware';
import { createProjectValidator } from '../validators/projects.validators';
const router = new ErrorRouter();

router
  .route('/')
  .get(ProjectController.getProjects)
  .post(validate(createProjectValidator), ProjectController.createProject);

router
  .route('/:id')
  .get(ProjectController.getProject)
  .delete(auth, ProjectController.deleteProject)
  .put(auth, ProjectController.updateProjectData);

export default router.router;
