import { OK } from 'http-status-codes';
import { Handler } from 'express';

import { TeamProjectUserService } from '../services/team-project-user.service';

export class TeamProjectUserController {
  static getProjectUser: Handler = async (req, res) => {
    const teamProjectUser = await TeamProjectUserService.getProjectUser(
      parseInt(req.params.id)
    );

    res.status(OK).json({
      message: 'Ok!',
      statusCode: OK,
      data: teamProjectUser
    });
  };

  static assingProjectUser: Handler = async (req, res) => {
    const id = parseInt(req.params.id);
    const projectUserId = parseInt(req.body.projectId);

    const teamProjectUser = await TeamProjectUserService.assingProjectUser(
      id,
      projectUserId
    );

    res.status(OK).json({
      message: 'Project Assigned!',
      statusCode: OK,
      data: teamProjectUser
    });
  };

  static removeProjectUser: Handler = async (req, res) => {
    await TeamProjectUserService.removeProjectUser(req.body.teamId, req.body.projectId);

    res.status(OK).json({
      message: 'Project Removed!',
      statusCode: OK
    });
  };
}
