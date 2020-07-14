// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.

import { Router } from 'express';
import * as indexCtrl from '../controllers/index.controller';

const router = Router();

router.get('/', indexCtrl.welcomeMessage);

export default router;
