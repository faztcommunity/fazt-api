// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.
import { Router } from "express";

import * as projectCtrl from "../controllers/project.controller";
import { handlerExceptionRoute } from "../error";

import * as projectValidators from "../validators/projects.validator";

const router = Router();

/**
 * @api {get} /projects Obtiene todas los Proyectos
 * @apiDescription Obtiene todas los proyectos guardados en la base de datos
 * @apiName GetProject
 * @apiGroup Projects
 *
 * @apiSuccess {String} name Name of the project.
 * @apiSuccess {String} description Description of the Project.
 * @apiSuccess {String} status Status of the Project.
 * @apiSuccess {String} tags of the Project.
 * @apiSuccess {String} projectType Type of the Project.
 * @apiSuccess {String} url URL of the Project.
 * @apiSuccess {String} githubURL githubURL of the Project.
 */
router.get("/", handlerExceptionRoute(projectCtrl.getProjects));

/**
 * @api {post} /projects Crea un nuevo proyecto
 * @apiDescription Crea un nuevo proyecto y lo guardada en la base de datos
 * @apiName PostProject
 * @apiGroup Projects
 *
 * @apiParam (Request body) {String} name Titulo deol proyecto
 * @apiParam (Request body) {String} description Descripción del proyecto
 * @apiParam (Request body) {String} status Estado del proyecto
 * @apiParam (Request body) {String} tags Etiquetas del proyecto
 * @apiParam (Request body) {String} projectType Tipo de proyecto.
 * @apiParam (Request body) {String} url URL del proyecto.
 * @apiParam (Request body) {String} githubURL Repositorio del proyecto.
 *
 * @apiSuccess {String} name Nombre del proyecto
 * @apiSuccess {String} description Descripcion del proyecto
 * @apiSuccess {String} status Estado del proyecto
 * @apiSuccess {String} tags Tags utilizados en el proyecto
 * @apiSuccess {String} projectType Tipo de proyecto (Code, Design)
 * @apiSuccess {String} url Url del proyecto
 * @apiSuccess {String} githubURL Repositorio del proyecto
 */
router.post(
  "/",
  projectValidators.createProjectValidator,
  handlerExceptionRoute(projectCtrl.createProject)
);

/**
 * @api {get} /projects/:id Obtiene un proyecto en especifico.
 * @apiDescription Obtiene un proyecto en especifico de los guardados en la base de datos
 * @apiName GetProjectID
 * @apiGroup Projects
 *
 * @apiParam id
 *
 * @apiSuccess {String} name Name of the project.
 * @apiSuccess {String} description Description of the Project.
 * @apiSuccess {String} status Status of the Project.
 * @apiSuccess {String} tags of the Project.
 * @apiSuccess {String} projectType Type of the Project.
 * @apiSuccess {String} url URL of the Project.
 * @apiSuccess {String} githubURL githubURL of the Project.
 * 
 * @apiError Project not found.
 */
router.get("/:id", handlerExceptionRoute(projectCtrl.getProject));

/**
 * @api {put} /projects/:id Actualiza un proyecto en especifico.
 * @apiDescription Obtiene un proyecto en especifico de los guardados en la base de datos y lo actualiza.
 * @apiName GetProjectID
 * @apiGroup Projects
 *
 * @apiParam id
 * @apiParam (Request body) {String} name Titulo del proyecto
 * @apiParam (Request body) {String} description Descripción del proyecto
 * @apiParam (Request body) {String} status Estado del proyecto
 * @apiParam (Request body) {String} tags Etiquetas del proyecto
 * @apiParam (Request body) {String} projectType Tipo de proyecto.
 * @apiParam (Request body) {String} url URL del proyecto.
 * @apiParam (Request body) {String} githubURL Repositorio del proyecto.
 *
 * @apiSuccess {String} name Titulo del proyecto
 * @apiSuccess {String} description Descripción del proyecto
 * @apiSuccess {String} status Estado del proyecto
 * @apiSuccess {String} tags Etiquetas del proyecto
 * @apiSuccess {String} projectType Tipo de proyecto.
 * @apiSuccess {String} url URL del proyecto.
 * @apiSuccess {String} githubURL Repositorio del proyecto.
 * 
 * @apiError Project not found.
 */
router.put("/:id", handlerExceptionRoute(projectCtrl.updateProject));

/**
 * @api {delete} /projects/:id Elimina un proyecto en especifico.
 * @apiDescription Obtiene un proyecto en especifico de los guardados en la base de datos y lo elimina.
 * @apiName DeleteProjectID
 * @apiGroup Projects
 *
 * @apiParam id
 *
 * @apiSuccess {String} name Titulo del proyecto.
 * @apiSuccess {String} description Descripción del proyecto.
 * @apiSuccess {String} status Estado del proyecto.
 * @apiSuccess {String} tags Etiquetas del proyecto.
 * @apiSuccess {String} projectType Tipo de proyecto.
 * @apiSuccess {String} url URL del proyecto.
 * @apiSuccess {String} githubURL Repositorio del proyecto.
 * 
 * @apiError Project not found.
 */
router.delete("/:id", handlerExceptionRoute(projectCtrl.deleteProject));

export default router;
