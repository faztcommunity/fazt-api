import { Handler } from 'express';
import { OK } from 'http-status-codes';
import { RolService } from '../services/rol.service';

export class RolController {
  static createRol: Handler = async (req, res) => {
    const roles = await RolService.create(req.body);

    res.status(OK).json({
      statusCode: OK,
      data: roles,
      message: 'ok!'
    });
  };
}
