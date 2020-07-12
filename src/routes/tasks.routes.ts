// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.
import { Router } from "express";

import * as taskCtrl from "../controllers/task.controllers";
import { handlerExceptionRoute } from "../error";

const router = Router();

/**
 * @api {get} /tasks Obtiene todas las Tareas
 * @apiDescription Obtiene todas las tareas guardadas en la base de datos
 * @apiName GetTask
 * @apiGroup Tasks
 * 
 * @apiSuccess {String} title Firstname of the User.
 * @apiSuccess {String} description Firstname of the User.
 * @apiSuccess {String} date Firstname of the User.
 * @apiSuccess {String} postingUser Firstname of the User.
 * @apiSuccess {String} createdAt Lastname of the User.
 * @apiSuccess {String} updatedAt Lastname of the User.
 */
router.get("/", handlerExceptionRoute(taskCtrl.getTasks));

/**
 * @api {post} /tasks Crea una nueva tarea
 * @apiDescription Crea una tarea nueva
 * @apiName PostTask
 * @apiGroup Tasks
 * 
 * @apiParam (Request body) {String} title Titulo de la tarea
 * @apiParam (Request body) {String} description Descripción de la tarea
 * @apiParam (Request body) {Date} date La fecha para realizar la tarea
 * @apiParam (Request body) {String} postingUser El usuario que ha creado la tarea
 * 
 * @apiSuccess {String} title Firstname of the User.
 * @apiSuccess {String} description Firstname of the User.
 * @apiSuccess {String} date Firstname of the User.
 * @apiSuccess {String} postingUser Firstname of the User.
 * @apiSuccess {String} createdAt Lastname of the User.
 * @apiSuccess {String} updatedAt Lastname of the User.
 */
router.post("/", handlerExceptionRoute(taskCtrl.createTask));


/**
 * @api {get} /tasks Obtiene una tarea en especifico.
 * @apiDescription Obtiene una tarea en especifico de las guardadas en la base de datos
 * @apiName GetTask
 * @apiGroup Tasks
 * 
 * @apiSuccess {String} title Firstname of the User.
 * @apiSuccess {String} description Firstname of the User.
 * @apiSuccess {String} date Firstname of the User.
 * @apiSuccess {String} postingUser Firstname of the User.
 * @apiSuccess {String} createdAt Lastname of the User.
 * @apiSuccess {String} updatedAt Lastname of the User.
 */
router.route("/:id").get(handlerExceptionRoute(taskCtrl.getTask));

router.route("/:id").put(handlerExceptionRoute(taskCtrl.updateTask));

router.route("/:id").delete(handlerExceptionRoute(taskCtrl.deleteTask));

export default router;
