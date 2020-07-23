// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.
import { Router } from 'express';
import { handlerExceptionRoute } from '../error';
import * as NewsCtrl from '../controllers/new.controller';
import * as NewsValidator from '../validators/news.validator';
const router = Router();

router.get('/', handlerExceptionRoute(NewsCtrl.getNews));
router.post(
  '/',
  NewsValidator.createNewValidator,
  handlerExceptionRoute(NewsCtrl.createNew)
);
router.get('/:id', handlerExceptionRoute(NewsCtrl.getNew));
router.put('/:id', handlerExceptionRoute(NewsCtrl.updateNew));
router.delete('/:id', handlerExceptionRoute(NewsCtrl.deleteNew));

export default router;
