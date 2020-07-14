// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.

import {Router} from 'express';
import { handlerExceptionRoute } from '../error';
import * as miscCtrl from '../controllers/misc.controller';
const router = Router();

/**
 * @apiDefine ErrorResponse
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "dataMessage",
 *     }
 */

/**
 * @apiDefine OneSuccessRes
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "_id": "dataId",
 *       "title": " dataTitle",
 *       "url": "dataUrl",
 *     }
 */

/**
 * @apiDefine PostP
 * @apiParam (Request body) {String} title Titulo del enlace
 * @apiParam (Request body) {String} url Dirección del enlace
 */

/**
 * @api {get} /misc Obtiene todos los enlaces de interes
 * @apiDescription Obtiene un arreglo de todos los enlaces de interes almacenados en la base de datos.
 * @apiName GetMisc
 * @apiGroup Misc
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *      {
 *       "_id": "dataId",
 *       "title": " dataTitle",
 *       "url": "dataUrl"
 *      }
 *     ]
 * @apiUse ErrorResponse
 */
router.get('/', handlerExceptionRoute(miscCtrl.getMiscs));

/**
 * @api {get} /misc/:id Obtiene un enlace en especifico
 * @apiDescription Obtiene un enlace en especifico de los almacenados en la base de datos a traves de su _id.
 * @apiName GetMiscId
 * @apiGroup Misc
 * @apiParam {String} _id Identificador del objeto almacenado.
 * @apiUse OneSuccessRes
 * @apiUse ErrorResponse
 */

router.get('/:id', handlerExceptionRoute(miscCtrl.getMisc));

/**
 * @api {post} /misc Crea un nuevo enlace
 * @apiDescription Crea un nuevo enlace de interes y lo almacena en la base de datos.
 * @apiName PostMisc
 * @apiGroup Misc
 * @apiUse PostP
 * @apiUse ErrorResponse
 */
router.post('/', handlerExceptionRoute(miscCtrl.createMisc));

/**
 * @api {put} /misc/:id Actualiza un enlace
 * @apiDescription Obtiene un enlace de interes en especifico de los almacenados en la
 *  base de datos a traves de su _id y lo actualiza.
 * @apiName PutMisc
 * @apiGroup Misc
 * @apiParam {String} _id Identificador del objeto almacenado.
 * @apiUse PostP
 * @apiUse OneSuccessRes
 * @apiUse ErrorResponse
 */

router.put('/:id', handlerExceptionRoute(miscCtrl.updateMisc));

/**
 * @api {delete} /misc/:id Elimina un enlace en especifico
 * @apiDescription Obtiene un enlace de interes en especifico de los almacenados en la base de datos
 *  a traves de su _id y lo elimina.
 * @apiName DeleteMisc
 * @apiGroup Misc
 * @apiParam {String} _id Identificador del objeto.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "dataMessage",
 *     }
 * @apiUse ErrorResponse
 */

router.delete('/:id',handlerExceptionRoute(miscCtrl.deleteMisc));

export default router;