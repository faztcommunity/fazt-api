import { Router } from 'express';

import { handlerExceptionRoute } from '../error';
import * as discord from '../controllers/discord.controller';

const router = Router();

router
  .route('/setting/:name')
  .get(handlerExceptionRoute(discord.getSetting))
  .put(handlerExceptionRoute(discord.updateOrCreateSetting));

export default router;
