// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.

import { Router } from 'express';
import { handlerExceptionRoute } from '../error';
import * as discord from '../controllers/discord.controller';
import * as discordValidator from '../validators/discord.validator';

const router = Router();

/**
 * @apiDefine SettingSuccess
 *
 * @apiSuccess {ObjectID} _id the id of the setting
 * @apiSuccess {String} name the name of the setting
 * @apiSuccess {String} value the value of the setting
 *
 * @apiSuccessExample {json} Success Response
 * HTTP/1.1 200 OK
 * {
 *  "_id": "5f0a984ae2f9a6e7b8331b36",
 *  "name": "moderation_channel_id",
 *  "value": "123456789",
 * }
 */

/**
 * @apiDefine ModerationSuccess
 *
 * @apiSuccess {ObjectID} _id the id of the moderation
 * @apiSuccess {String} type the type of the moderation
 * @apiSuccess {String} user_id the id of the user
 * @apiSuccess {String} reason the reason of the user is modered
 * @apiSuccess {String} moderator_id the id of the moderator
 * @apiSuccess {Boolean} revoked if the moderation is revoked
 * @apiSuccess {Date} expiration_date the date of moderation expire
 * @apiSuccess {Date} creation_date the date the moderation is created
 */

/**
 * @apiDefine GetModerationExample
 * @apiSuccessExample {json} Success Response
 * HTTP/1.1 200 OK
 * [{
 *  "creation_date": "2020-07-12T04:57:43.979Z",
 *  "revoked": false,
 *  "_id": "5f0a984ae2f9a6e7b8331b36",
 *  "type": "ban",
 *  "reason": "spam",
 *  "moderator_id": "676845747",
 *  "expiration_date": null,
 *  "user_id": "123"
 * }]
 */

/**
 * @apiDefine ExampleReturnOnlyModeration
 * @apiSuccessExample {json} Success Response
 * HTTP/1.1 200 OK
 * {
 *  "creation_date": "2020-07-12T04:57:43.979Z",
 *  "revoked": false,
 *  "_id": "5f0a984ae2f9a6e7b8331b36",
 *  "type": "ban",
 *  "reason": "spam",
 *  "moderator_id": "676845747",
 *  "expiration_date": null,
 *  "user_id": "123"
 * }
 */

router
  .route('/setting/:name')
  /**
   * @api {get} /setting/:name Get Setting
   * @apiName GetSetting
   * @apiGroup Discord
   * @apiParam {String} name the name of the setting
   *
   * @apiUse SettingSuccess
   *
   */
  .get(handlerExceptionRoute(discord.getSetting))
  /**
   * @api {put} /setting/:name Update or Create Setting
   * @apiName UpdateOrCreateSetting
   * @apiGroup Discord
   * @apiParam {String} name the name of the setting
   *
   * @apiParam (Request body) {String} value the value of the setting
   *
   * @apiUse SettingSuccess
   */

  .put(
    discordValidator.updateOrCreateSettingValidator,
    handlerExceptionRoute(discord.updateOrCreateSetting)
  );

router
  .route('/moderation/:user_id')
  /**
   * @api {get} /moderation/:user_id Get User Moderations
   * @apiName GetUserModeration
   * @apiGroup Discord
   * @apiParam {String} user_id the id of the user
   *
   *
   * @apiUse ModerationSuccess
   * @apiUse GetModerationExample

   */
  .get(handlerExceptionRoute(discord.getUserModerations))
  /**
   * @api {post} /moderation/:user_id Create Moderations
   * @apiName createModeration
   * @apiGroup Discord
   * @apiParam {String} user_id the id of the user
   * @apiParam (Request body) {String} type the type of moderation
   * @apiParam (Request body) {String} user_id the user of the moderation
   * @apiParam (Request body) {String} reason the reason of moderation
   * @apiParam (Request body) {String} moderator_id the moderator of moderation
   * @apiParam (Request body) {Date} expiration_date the expiration of moderation
   *
   * @apiUse ModerationSuccess
   * @apiUse ExampleReturnOnlyModeration
   *
   */
  .post(
    discordValidator.createModerationValidator,
    handlerExceptionRoute(discord.createModerationUser)
  );

router
  .route('/moderation/:user_id/:type')
  /**
   * @api {get} /moderation/:user_id/:type Get User Moderations With Type
   * @apiName GetUserModerationWithType
   * @apiGroup Discord
   * @apiParam {String} user_id the id of the user
   * @apiParam {String} type the type of the moderation
   *
   *
   * @apiUse ModerationSuccess
   * @apiUse GetModerationExample
   */
  .get(handlerExceptionRoute(discord.getUserModerationsWithType));

router
  .route('/moderation/:id')
  /**
   * @api {patch} /moderation/:id Revoke Moderation
   * @apiName RevokeModeration
   * @apiGroup Discord
   * @apiParam (Request body) {Boolean} revoked if the moderation is revoked
   *
   * @apiUse ModerationSuccess
   * @apiSuccessExample {json} Success Response
   * HTTP/1.1 200 OK
   * {
   *  "creation_date": "2020-07-12T04:57:43.979Z",
   *  "revoked": true,
   *  "_id": "5f0a984ae2f9a6e7b8331b36",
   *  "type": "ban",
   *  "reason": "spam",
   *  "moderator_id": "676845747",
   *  "expiration_date": null,
   *  "user_id": "123"
   * }
   */
  .patch(
    discordValidator.revokeModerationValidator,
    handlerExceptionRoute(discord.revokeModeration)
  );

export default router;
