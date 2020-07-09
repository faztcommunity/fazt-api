import { Router } from 'express';

import * as taskCtrl from '../controllers/task.controllers';
import { handlerExceptionRoute } from '../error';

const router = Router();

router
  .route('/')
  .get(handlerExceptionRoute(taskCtrl.getTasks))
  .post(handlerExceptionRoute(taskCtrl.createTask));

router
  .route('/:id')
  .get(handlerExceptionRoute(taskCtrl.getTask))
  .put(handlerExceptionRoute(taskCtrl.updateTask))
  .delete(handlerExceptionRoute(taskCtrl.deleteTask));

export default router;
