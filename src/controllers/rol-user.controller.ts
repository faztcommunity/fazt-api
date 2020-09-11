import { OK } from 'http-status-codes';
import { Handler } from 'express';

import { RolUserService } from '../services/rol-user.service';

export class RolUserController {
  static getUserRoles: Handler = async (req, res) => {
    const userRoles = await RolUserService.getRoles(req.user.id);
    console.log(userRoles);

    res.status(OK).json({
      message: 'Ok!',
      statusCode: OK,
      data: userRoles
    });
  };

  static assingRol: Handler = async (req, res) => {
    const userRoles = await RolUserService.assignRol(req.user.id, req.body.rolId);

    res.status(OK).json({
      message: 'Rol Assigned!',
      statusCode: OK,
      data: userRoles
    });
  };

  static removeRol: Handler = async (req, res) => {
    await RolUserService.removeRol(req.user.id, req.body.rolId);

    res.status(OK).json({
      message: 'Rol Removed!',
      statusCode: OK
    });
  };
}
