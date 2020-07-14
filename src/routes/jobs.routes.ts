// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.

import { Router } from 'express';
import { handlerExceptionRoute } from '../error';
import * as jobCtrl from '../controllers/jobs.controller';
import * as jobsValidator from '../validators/jobs.validator';
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
 * @apiDefine OneSuccessR
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "_id": "dataId",
 *       "title": " dataTitle",
 *       "description": "dataDescription",
 *       "employer": "dataEmployer",
 *       "employerEmail": "dataEmployerEmail",
 *       "proposals": [{"dataProposals"}],
 *     }
 */
/**
 * @apiDefine PP
 * @apiParam (Request body) {String} title Titulo del trabajo.
 * @apiParam (Request body) {String} description Descripción del trabajo.
 * @apiParam (Request body) {String} employer Empleador.
 * @apiParam (Request body) {String} employerEmail Correo electrónico del empleador.
 * @apiParam (Request body) {[ObjectId]} proposals Propuesta/s del empleador.
 */

 /**
 * @api {get} /jobs Obtiene todos los trabajos
 * @apiDescription Obtiene un arreglo todos los trabajos almacenados en la base de datos.
 * @apiName GetJobs
 * @apiGroup Jobs
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *      {
 *       "_id": "dataId",
 *       "title": " dataTitle",
 *       "description": "dataDescription",
 *       "employer": "dataEmployer",
 *       "employerEmail": "dataEmployerEmail",
 *       "proposals": [{"dataProposals"}],
 *      }
 *     ]
 * @apiUse ErrorResponse
 */
router.get('/', handlerExceptionRoute(jobCtrl.getJobs));

/**
 * @api {post} /jobs Crea un nuevo Trabajo
 * @apiDescription Crea un nuevo Trabajo y lo almacena en la base de datos.
 * @apiName PostJob
 * @apiGroup Jobs
 * @apiUse PP
 * @apiUse OneSuccessR
 * @apiUse ErrorResponse
 */
router.post(
  '/',
  jobsValidator.createJobValidator,
  handlerExceptionRoute(jobCtrl.createJob)
);

/**
 * @api {get} /jobs/:id Obtiene un trabajo en específico
 * @apiDescription Obtiene un trabajo en especifico de los almacenados en la base de datos a traves de su _id.
 * @apiName GetJobID
 * @apiGroup Jobs
 * @apiParam {String} _id Identificador del objeto almacenado.
 * @apiUse OneSuccessR
 * @apiUse ErrorResponse
 */
router.route('/:id').get(handlerExceptionRoute(jobCtrl.getJob));

/**
 * @api {put} /jobs/:id Actualiza un trabajo en especifico
 * @apiDescription Obtiene un trabajo en especifico de los guardados en la base de datos y lo actualiza con el
 * contenido del cuerpo.
 * @apiName PutJob
 * @apiGroup Jobs
 * @apiParam {String} _id Identificador del objeto almacenado.
 * @apiUse PP
 * @apiUse OneSuccessResponse
 * @apiUse ErrorResponse
 */
router.route('/:id').put(handlerExceptionRoute(jobCtrl.updateJob));

/**
 * @api {delete} /jobs/:id Elimina un trabajo en especifico
 * @apiDescription Obtiene un trabajo en especifico de los guardados en la base de datos a traves de su _id
 * y lo elimina.
 * @apiName DeleteJobID
 * @apiGroup Jobs
 * @apiParam {String} _id Identificador del objeto.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "dataMessage",
 *     }
 * @apiUse ErrorResponse
 */
router.route('/:id').delete(handlerExceptionRoute(jobCtrl.deleteJob));

export default router;
