// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.
import { Router } from 'express';
import { handlerExceptionRoute } from '../error';
import * as NewsCtrl from '../controllers/new.controller';
const router = Router();

router.get('/', handlerExceptionRoute(NewsCtrl.getNews));
router.get('/:id', handlerExceptionRoute(NewsCtrl.getNew));
router.post('/', handlerExceptionRoute(NewsCtrl.createNew));
router.put('/:id', handlerExceptionRoute(NewsCtrl.updateNew));
router.delete('/:id', handlerExceptionRoute(NewsCtrl.deleteNew));

export default router;
