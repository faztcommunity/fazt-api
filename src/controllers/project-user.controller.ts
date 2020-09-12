import { OK } from 'http-status-codes';
import { Handler } from 'express';

import { ProjectUserService } from '../services/project-user.service';

export class ProjectUserController {
  static getProjectUser: Handler = async (req, res) => {
    const userProject = await ProjectUserService.getProject(req.user.id);

    res.status(OK).json({
      message: 'Ok!',
      statusCode: OK,
      data: userProject
    });
  };

  static assingProject: Handler = async (req, res) => {
    const projectUser = await ProjectUserService.assingProject(
      req.user.id,
      req.body.projectId
    );

    res.status(OK).json({
      message: 'Project Assigned!',
      statusCode: OK,
      data: projectUser
    });
  };

  static removeProject: Handler = async (req, res) => {
    await ProjectUserService.removeProject(req.user.id, req.body.projectId);

    res.status(OK).json({
      message: 'Project Removed!',
      statusCode: OK
    });
  };
}
