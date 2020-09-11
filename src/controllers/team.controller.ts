import { Handler } from 'express';
import { OK } from 'http-status-codes';
import { TeamService } from '../services/team.service';

export class TeamController {
  static getTeams: Handler = async (req, res) => {
    const teams = await TeamService.getAll();

    res.status(OK).json({
      statusCode: OK,
      data: teams,
      message: 'Ok!'
    });
  };

  static getTeam: Handler = async (req, res) => {
    const id = parseInt(req.params.id);
    const team = await TeamService.getOne(id);

    res.status(OK).json({
      statusCode: OK,
      data: team,
      message: 'Ok!'
    });
  };

  static createTeam: Handler = async (req, res) => {
    const team = await TeamService.create(req.body);

    res.status(OK).json({
      statusCode: OK,
      data: team,
      message: 'Team Created!'
    });
  };

  static deleteTeam: Handler = async (req, res) => {
    const id = parseInt(req.params.id);

    await TeamService.delete(id);

    res.status(OK).json({
      statusCode: OK,
      message: 'Team Deleted!'
    });
  };

  static updateTeamData: Handler = async (req, res) => {
    const id = parseInt(req.params.id);

    const team = await TeamService.updateData(id, req.body);

    res.status(OK).json({
      statusCode: OK,
      data: team,
      message: 'Team Updated!'
    });
  };
}
