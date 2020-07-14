// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.

import { Router } from 'express';
import { handlerExceptionRoute } from '../error';
import * as projectCtrl from '../controllers/project.controller';
import * as projectValidators from '../validators/projects.validator';
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
 * @apiDefine OneSuccessRe
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *       "_id": "dataId",
 *       "name": " dataName",
 *       "description": "dataDescription",
 *       "status": "dataStatus",
 *       "tags": ["dataTag"],
 *       "projectType": "dataProjectType",
 *       "url": "dataUrl",
 *       "githubURL": "dataGitHubUrl"
 *      }
 */
/**
 * @apiDefine PostPut1
 * @apiParam (Request body) {String} name Nombre del proyecto
 * @apiParam (Request body) {String} description Descripción del proyecto
 * @apiParam (Request body) {String} status Estado del proyecto
 * @apiParam (Request body) {[String]} tags Etiquetas del proyecto
 * @apiParam (Request body) {String} projectType Tipo de proyecto.
 * @apiParam (Request body) {String} url URL del proyecto.
 * @apiParam (Request body) {String} githubURL Repositorio del proyecto.
 */

/**
 * @api {get} /projects Obtiene todos los Proyectos
 * @apiDescription Obtiene un arreglo de todos los proyectos almacenados en la base de datos.
 * @apiName GetProject
 * @apiGroup Projects
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *      {
 *       "_id": "dataId",
 *       "name": " dataName",
 *       "description": "dataDescription",
 *       "status": "dataStatus",
 *       "tags": ["dataTag"],
 *       "projectType": "dataProjectType",
 *       "url": "dataUrl",
 *       "githubURL": "dataGitHubUrl"
 *      }
 *     ]
 * @apiUse ErrorResponse
 */
router.get('/', handlerExceptionRoute(projectCtrl.getProjects));

/**
 * @api {post} /projects Crea un nuevo proyecto
 * @apiDescription Crea un nuevo proyecto y lo almacena en la base de datos.
 * @apiName PostProject
 * @apiGroup Projects
 * @apiUse PostPut1
 * @apiUse OneSuccessRe
 * @apiUse ErrorResponse
 */
router.post(
  '/',
  projectValidators.createProjectValidator,
  handlerExceptionRoute(projectCtrl.createProject)
);

/**
 * @api {get} /projects/:id Obtiene un proyecto en especifico
 * @apiDescription Obtiene un proyecto en especifico de los almacenados en la base de datos a traves de su _id.
 * @apiName GetProjectID
 * @apiGroup Projects
 * @apiParam {String} _id Identificador del objeto almacenado.
 * @apiUse OneSuccessRe
 * @apiUse ErrorResponse
 */
router.get('/:id', handlerExceptionRoute(projectCtrl.getProject));

/**
 * @api {put} /projects/:id Actualiza un proyecto en especifico
 * @apiDescription Obtiene un proyecto en especifico de los almacenados en la base de datos a traves de su _id
 *  y lo actualiza con el contenido del cuerpo.
 * @apiName PutProject
 * @apiGroup Projects
 * @apiParam {String} _id Identificador del objeto almacenado.
 * @apiUse PostPut1
 * @apiUse OneSuccessRe
 * @apiUse ErrorResponse
 */
router.put('/:id', handlerExceptionRoute(projectCtrl.updateProject));

/**
 * @api {delete} /projects/:id Elimina un proyecto en especifico
 * @apiDescription Obtiene un proyecto en especifico de los almacenados en la base de datos a traves de su _id
 *  y lo elimina.
 * @apiName DeleteProjectID
 * @apiGroup Projects
 * @apiParam {String} _id Identificador del objeto almacenado.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "dataMessage",
 *     }
 * @apiUse ErrorResponse
 */
router.delete('/:id', handlerExceptionRoute(projectCtrl.deleteProject));

export default router;
