// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.

import { Router } from 'express';
import { handlerExceptionRoute } from '../error';
import * as taskCtrl from '../controllers/task.controllers';
import * as tasksValidator from '../validators/tasks.validator';
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
 * @apiDefine OneSuccessResp
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "_id": "dataId",
 *       "title": " dataTitle",
 *       "description": "dataDescription",
 *       "date": "dataDate",
 *       "postingUser": {"dataPostingUser"},
 *     }
 */
/**
 * @apiDefine PostPut2
 * @apiParam (Request body) {String} title Titulo de la tarea.
 * @apiParam (Request body) {String} description Descripcion de la tarea.
 * @apiParam (Request body) {Date} date Fecha de la tarea.
 * @apiParam (Request body) {ObjectId} postingUser Usuario creador de la tarea.
 */

/**
 * @api {get} /tasks Obtiene todas las Tareas
 * @apiDescription Obtiene un arreglo de todas las tareas almacenadas en la base de datos.
 * @apiName GetTask
 * @apiGroup Tasks
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *    [
 *     {
 *       "_id": "dataId",
 *       "title": " dataTitle",
 *       "description": "dataDescription",
 *       "date": "dataDate",
 *       "postingUser": {"dataPostingUser"},
 *     }
 *      ]
 * @apiUse ErrorResponse
 */
router.get('/', handlerExceptionRoute(taskCtrl.getTasks));

/**
 * @api {post} /tasks Crea una nueva tarea
 * @apiDescription Crea una tarea nueva y la almacena en la base de datos.
 * @apiName PostTask
 * @apiGroup Tasks
 * @apiUse PostPut2
 * @apiUse OneSuccessResp
 * @apiUse ErrorResponse
 */
router.post(
  '/',
  tasksValidator.createTaskValidator,
  handlerExceptionRoute(taskCtrl.createTask)
);

/**
 * @api {get} /tasks/:id Obtiene una tarea en especifico
 * @apiDescription Obtiene una tarea en especifico de los almacenados en la base de datos a traves de su _id.
 * @apiName GetTaskId
 * @apiGroup Tasks
 * @apiParam {String} _id Identificador del objeto almacenado.
 * @apiUse OneSuccessResp
 * @apiUse ErrorResponse
 */
router.route('/:id').get(handlerExceptionRoute(taskCtrl.getTask));

/**
 * @api {put} /tasks/:id Actualiza una tarea en especifico
 * @apiDescription Obtiene una tarea en especifico de los guardados en la base de datos y lo actualiza con el
 * contenido del cuerpo.
 * @apiName PutTask
 * @apiGroup Tasks
 * @apiParam {String} _id Identificador del objeto almacenado.
 * @apiUse PostPut2
 * @apiUse OneSuccessResp
 * @apiUse ErrorResponse
 */
router.route('/:id').put(handlerExceptionRoute(taskCtrl.updateTask));

/**
 * @api {delete} /tasks/:id Elimina una tarea en especifico
 * @apiDescription Obtiene una tarea en especifico de los guardados en la base de datos a traves de su _id
 * y lo elimina.
 * @apiName DeleteTaskID
 * @apiGroup Tasks
 * @apiParam {String} _id Identificador del objeto.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "dataMessage",
 *     }
 * @apiUse ErrorResponse
 */
router.route('/:id').delete(handlerExceptionRoute(taskCtrl.deleteTask));

export default router;
