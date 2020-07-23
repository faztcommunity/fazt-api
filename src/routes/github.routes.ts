// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.
import { Router } from 'express';
import { handlerExceptionRoute } from '../error';
import * as GithubCtrl from '../controllers/github.controller';
import * as GithubValidator from '../validators/github.validators';
const router = Router();

router.get('/', handlerExceptionRoute(GithubCtrl.getGithubs));
router.post(
  '/',
  GithubValidator.createGithubValidator,
  handlerExceptionRoute(GithubCtrl.createGithub)
);
router.get('/:id', handlerExceptionRoute(GithubCtrl.getGithub));
router.put('/:id', handlerExceptionRoute(GithubCtrl.updateGithub));
router.delete('/:id', handlerExceptionRoute(GithubCtrl.deleteGithub));

export default router;
