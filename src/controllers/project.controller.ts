import { Handler } from 'express';
import { OK } from 'http-status-codes';
import { ProjectService } from '../services/project.service';

export class ProjectController {
  static getProjects: Handler = async (req, res) => {
    const projects = await ProjectService.getAll();

    res.status(OK).json({
      statusCode: OK,
      data: projects,
      message: 'Ok!'
    });
  };

  static getProject: Handler = async (req, res) => {
    const id = parseInt(req.params.id);
    const project = await ProjectService.getOne(id);

    res.status(OK).json({
      statusCode: OK,
      data: project,
      message: 'Ok!'
    });
  };

  static createProject: Handler = async (req, res) => {
    const { nameProject } = req.body;

    const project = await ProjectService.create(nameProject);

    res.status(OK).json({
      statusCode: OK,
      data: project,
      message: 'Project Created!'
    });
  };

  static deleteProject: Handler = async (req, res) => {
    const id = parseInt(req.params.id);

    await ProjectService.delete(id);

    res.status(OK).json({
      statusCode: OK,
      message: 'Project Deleted!'
    });
  };

  static updateProjectData: Handler = async (req, res) => {
    const id = parseInt(req.params.id);

    const { nameProject } = req.body;

    const project = await ProjectService.updateData(id, nameProject);

    res.status(OK).json({
      statusCode: OK,
      data: project,
      message: 'Project Updated!'
    });
  };
}
