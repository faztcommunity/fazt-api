// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.
import { Router } from 'express';
import * as userCtrl from '../controllers/user.controller';
import { handlerExceptionRoute } from '../error';

const router = Router();

/**
 * @api {get} /users Obtiene todos los usuarios
 * @apiDescription Obtiene todos los usuarios registrados en la base de datos
 * @apiName GetUsers
 * @apiGroup Users
 *
 * @apiSuccess {String} nickname Nombre de Usuario
 * @apiSuccess {String} firstname Primer nombre del Usuario
 * @apiSuccess {String} lastname Apellido del Usuario
 * @apiSuccess {String} email Correo electrónico del Usuario
 * @apiSuccess {String} password Contraseña del Usuario
 *
 */
router.get('/', handlerExceptionRoute(userCtrl.getUsers));

/**
 * @api {post} /usuers Crea una nueva Usuario
 * @apiDescription Crea un Usuario nuevo
 * @apiName PostUser
 * @apiGroup Users
 *
 * @apiParam (Request body) {String} nickname Nombre de Usuario
 * @apiParam (Request body) {String} firstname Primer nombre del Usuario
 * @apiParam (Request body) {String} lastname Apellido del Usuario
 * @apiParam (Request body) {String} email Correo electrónico del Usuario
 * @apiParam (Request body) {String} password Contraseña del Usuario
 *
 * @apiSuccess {String} nickname Nombre de Usuario
 * @apiSuccess {String} firstname Primer nombre del Usuario
 * @apiSuccess {String} lastname Apellido del Usuario
 * @apiSuccess {String} email Correo electrónico del Usuario
 * @apiSuccess {String} password Contraseña del Usuario
 */
router.post('/', handlerExceptionRoute(userCtrl.createUser));

/**
 * @api {get} /users/:id Obtiene un usuario en especifico.
 * @apiDescription Obtiene un usuario en especifico de los guardados en la base de datos
 * @apiName GetUserID
 * @apiGroup Users
 *
 * @apiParam id
 *
 * @apiSuccess {String} nickname Nombre de Usuario
 * @apiSuccess {String} firstname Primer nombre del Usuario
 * @apiSuccess {String} lastname Apellido del Usuario
 * @apiSuccess {String} email Correo electrónico del Usuario
 * @apiSuccess {String} password Contraseña del Usuario
 *
 * @apiError User not found.
 */
router.get('/:id', handlerExceptionRoute(userCtrl.getUser));

/**
 * @api {put} /users/:id Actualiza un usuario en especifico.
 * @apiDescription Obtiene un usuario en especifico de los guardados en la base de datos y lo actualiza.
 * @apiName GetUserID
 * @apiGroup Users
 *
 * @apiParam id
 * @apiParam (Request body) {String} nickname Nombre de Usuario
 * @apiParam (Request body) {String} firstname Primer nombre del Usuario
 * @apiParam (Request body) {String} lastname Apellido del Usuario
 * @apiParam (Request body) {String} email Correo electrónico del Usuario
 * @apiParam (Request body) {String} password Contraseña del Usuario
 *
 * @apiSuccess {String} nickname Nombre de Usuario
 * @apiSuccess {String} firstname Primer nombre del Usuario
 * @apiSuccess {String} lastname Apellido del Usuario
 * @apiSuccess {String} email Correo electrónico del Usuario
 * @apiSuccess {String} password Contraseña del Usuario
 *
 * @apiError User not found.
 */
router.put('/', handlerExceptionRoute(userCtrl.updateUser));

router.delete('/:id', handlerExceptionRoute(userCtrl.deleteUser));

router.post('/signin', handlerExceptionRoute(userCtrl.signinUser));
export default router;
