import { Router } from 'express';
import * as jobCtrl from '../controllers/jobs.controller';
import { handlerExceptionRoute} from '../error';

const router = Router();

/**
 * @api {get} /jobs Obtiene todos los trabajos
 * @apiDescription Obtiene todos los trabajos almacenados en la base de datos.
 * @apiName GetJobs
 * @apiGroup Jobs
 *
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
 *      },
 *      {
 *       "_id": "dataId2",
 *       "title": " dataTitle2",
 *       "description": "dataDescription2",
 *       "employer": "dataEmployer2",
 *       "employerEmail": "dataEmployerEmail2",
 *       "proposals": [{"dataProposals2"}],
 *      }
 *     ]
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "dataMessage",
 *     }
 */
router.get('/', handlerExceptionRoute(jobCtrl.getJobs));

/**
 * @api {post} /jobs Crea un nuevo Trabajo
 * @apiDescription Crea un nuevo Trabajo y lo almacena en la base de datos.
 * @apiName PostJob
 * @apiGroup Jobs
 * 
 * @apiParam (Request body) {String} title Titulo del trabajo.
 * @apiParam (Request body) {String} description Descripción del trabajo.
 * @apiParam (Request body) {String} employer Empleador.
 * @apiParam (Request body) {String} employerEmail Correo electrónico del empleador.
 * @apiParam (Request body) {[ObjectId]} proposals Propuesta/s del empleador.
 * 
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
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "dataMessage",
 *     }
 */
router.post('/', handlerExceptionRoute(jobCtrl.createJob));

/**
 * @api {get} /jobs/:id Obtiene un trabajo en específico
 * @apiDescription Obtiene un trabajo en especifico de los almacenados en la base de datos.
 * @apiName GetJobID
 * @apiGroup Jobs
 *
 * @apiParam {String} _id Identificador del objeto almacenado.
 * 
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
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "dataMessage",
 *     }
 */
router.route('/:id').get(handlerExceptionRoute(jobCtrl.getJob));

/**
 * @api {put} /jobs/:id Actualiza un trabajo en especifico.
 * @apiDescription Obtiene un trabajo en especifico de los guardados en la base de datos y lo actualiza con el
 * contenido del cuerpo.
 * @apiName GetJobID
 * @apiGroup Jobs
 *
 * @apiParam {String} _id Identificador del objeto almacenado.
 * @apiParam (Request body) {String} title Titulo del trabajo
 * @apiParam (Request body) {String} description Descripción del trabajo
 * @apiParam (Request body) {String} employeer Empleado del trabajo
 * @apiParam (Request body) {String} employerEmail Correo electrónico del empleado
 * @apiParam (Request body) {[ObjectId]} proposals Propuesta/s del empleador.
 * 
 * @apiParamExample {json} Request-Example:
 *     {
 *       "title": "newMessageTitle"
 *     }
 *
  * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *      {
 *       "_id": "dataId",
 *       "title": "newMessageTitle",
 *       "description": "dataDescription",
 *       "employer": "dataEmployer",
 *       "employerEmail": "dataEmployerEmail",
 *       "proposals": [{"dataProposals"}],
 *      }
 *     ]
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "dataMessage",
 *     }
 */
router.route('/:id').put(handlerExceptionRoute(jobCtrl.updateJob));


/**
 * @api {delete} /jobs/:id Elimina un trabajo en especifico.
 * @apiDescription Obtiene un trabajo en especifico de los guardados en la base de datos y lo elimina.
 * @apiName DeleteJobID
 * @apiGroup Jobs
 *
 * @apiParam {String} _id Identificador del objeto.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "dataMessage",
 *     }
 *  
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "dataMessage",
 *     }
 */
router.route('/:id').delete(handlerExceptionRoute(jobCtrl.deleteJob));

export default router;
