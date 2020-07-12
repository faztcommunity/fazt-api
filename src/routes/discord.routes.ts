import { Router } from 'express';

import { handlerExceptionRoute } from '../error';
import * as discord from '../controllers/discord.controller';

const router = Router();

router
  .route('/setting/:name')
  .get(handlerExceptionRoute(discord.getSetting))
  .put(handlerExceptionRoute(discord.updateOrCreateSetting));

router
  .route('/moderation/:user_id')
  .get(handlerExceptionRoute(discord.getUserModerations))
  .post(handlerExceptionRoute(discord.createModerationUser));

router
  .route('/moderation/:user_id/:type')
  .get(handlerExceptionRoute(discord.getUserModerationsWithType));

router
  .route('/moderation/:id')
  .patch(handlerExceptionRoute(discord.revokeModeration));

export default router;
