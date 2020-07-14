// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.

import { Router } from 'express';
import { handlerExceptionRoute } from '../error';
import * as userCtrl from '../controllers/user.controller';
import authMiddleware from '../middlewares/auth.middleware';
import * as usersValidator from '../validators/users.validator';
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
 * @apiDefine OneSuccessResponse
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "_id": "dataId",
 *       "nickname": " dataNickname",
 *       "firstname": "dataFirstname",
 *       "lastname": "dataLastname",
 *       "email": "dataEmail",
 *       "password": "dataPassword",
 *     }
 */
/**
 * @apiDefine PostPut
 * @apiParam (Request body) {String} nickname Nombre de Usuario.
 * @apiParam (Request body) {String} firstname Nombre del Usuario.
 * @apiParam (Request body) {String} lastname Apellido del Usuario.
 * @apiParam (Request body) {String} email Correo electrónico del Usuario.
 * @apiParam (Request body) {String} password Contraseña del Usuario.
 */

/**
 * @api {get} /users Obtiene todos los usuarios
 * @apiDescription Obtiene un arreglo de todos los usuarios almacenados en la base de datos.
 * @apiName GetUsers
 * @apiGroup Users
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *    [
 *     {
 *       "_id": "dataId",
 *       "nickname": " dataNickname",
 *       "firstname": "dataFirstname",
 *       "lastname": "dataLastname",
 *       "email": "dataEmail",
 *       "password": "dataPassword",
 *     }
 *      ]
 */
router.get('/', handlerExceptionRoute(userCtrl.getUsers));

/**
 * @api {post} /users/signin Crea un nuevo Usuario
 * @apiDescription Registra un usuario nuevo
 * @apiName PostUser
 * @apiGroup Users
 * @apiUse PostPut
 * @apiUse OneSuccessResponse
 * @apiUse ErrorResponse
 */
router.post(
  '/signin',
  usersValidator.signUpValidator,
  handlerExceptionRoute(userCtrl.createUser)
);

/**
 * @api {get} /users/:id Obtiene un usuario en especifico
 * @apiDescription Obtiene un usuario en especifico de los almacenados en la base de datos a traves de su _id.
 * @apiName GetUserId
 * @apiGroup Users
 * @apiParam {String} _id Identificador del objeto almacenado.
 * @apiUse OneSuccessResponse
 * @apiUse ErrorResponse
 */
router.get('/:id', handlerExceptionRoute(userCtrl.getUser));

/**
 * @api {put} /users/:id Actualiza un usuario en especifico
 * @apiDescription Obtiene un usuario en especifico de los almacenados en la base de datos a traves de su _id
 * y lo actualiza.
 * @apiName PutUser
 * @apiGroup Users
 * @apiParam {String} _id Identificador del objeto almacenado.
 * @apiUse PostPut
 * @apiUse OneSuccessResponse
 * @apiUse ErrorResponse
 */
router.put('/', authMiddleware, handlerExceptionRoute(userCtrl.updateUser));

/**
 * @api {delete} /users/ Elimina una usuario en especifico
 * @apiDescription Obtiene un usuario en especifico de los almacenados en la base de datos a traves de su _id
 * y lo elimina.
 * @apiName DeleteUserID
 * @apiGroup Users
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "dataMessage",
 *     }
 * @apiUse ErrorResponse
 */
router.delete('/', authMiddleware, handlerExceptionRoute(userCtrl.deleteUser));

/**
 * @api {post} /users/login Valida campos
 * @apiDescription Valida que los campos email y password hayan sido completados.
 * @apiName PostUserSingIn
 * @apiGroup Users
 * @apiParam (Request body) {String} email Correo electrónico del Usuario.
 * @apiParam (Request body) {String} password Contraseña del Usuario.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "dataMessage",
 *     }
 * @apiUse ErrorResponse
 */
router.post(
  '/login',
  usersValidator.logInValidator,
  handlerExceptionRoute(userCtrl.loginUser)
);

export default router;
