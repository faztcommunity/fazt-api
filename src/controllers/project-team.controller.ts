import { OK } from 'http-status-codes';
import { Handler } from 'express';

import { ProjectTeamService } from '../services/project-team.service';

export class ProjectTeamController {
  static getProjectTeam: Handler = async (req, res) => {
    const projectTeam = await ProjectTeamService.getProject(parseInt(req.params.id));

    res.status(OK).json({
      message: 'Ok!',
      statusCode: OK,
      data: projectTeam
    });
  };

  static assingProject: Handler = async (req, res) => {
    const id = parseInt(req.params.id);
    const projectId = parseInt(req.body.projectId);

    const projectTeam = await ProjectTeamService.assingProject(id, projectId);

    res.status(OK).json({
      message: 'Project Assigned!',
      statusCode: OK,
      data: projectTeam
    });
  };

  static removeProject: Handler = async (req, res) => {
    await ProjectTeamService.removeProject(req.body.teamId, req.body.projectId);

    res.status(OK).json({
      message: 'Project Removed!',
      statusCode: OK
    });
  };
}
