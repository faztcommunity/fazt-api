import { Router } from 'express';
import * as jobCtrl from '../controllers/jobs.controller';

const router = Router();

router.route('/')
  .get(jobCtrl.getJobs)
  .post(jobCtrl.createJob);

router.route('/:id')
  .get(jobCtrl.getJob)
  .put(jobCtrl.updateJob)
  .delete(jobCtrl.deleteJob);


export default router;
