import { Router } from 'express';

import * as projectCtrl from '../controllers/project.controller';
import { handlerExceptionRoute } from '../error';

const router = Router();

router
  .route('/')
  .get(handlerExceptionRoute(projectCtrl.getProjects))
  .post(handlerExceptionRoute(projectCtrl.createProject));

router
  .route('/:id')
  .get(handlerExceptionRoute(projectCtrl.getProject))
  .put(handlerExceptionRoute(projectCtrl.updateProject))
  .delete(handlerExceptionRoute(projectCtrl.deleteProject));

export default router;
