import { Handler } from 'express';
import { OK } from 'http-status-codes';
import { RolService } from '../services/rol.service';

export class RolController {
  static getRoles: Handler = async (req, res) => {
    const roles = await RolService.getAll();

    res.status(OK).json({
      statusCode: OK,
      data: roles,
      message: 'Ok!'
    });
  };

  static getRol: Handler = async (req, res) => {
    const id = parseInt(req.params.id);
    const rol = await RolService.getOne(id);

    res.status(OK).json({
      statusCode: OK,
      data: rol,
      message: 'Ok!'
    });
  };

  static createRol: Handler = async (req, res) => {
    const { nameRol } = req.body;

    const rol = await RolService.create(nameRol);

    res.status(OK).json({
      statusCode: OK,
      data: rol,
      message: 'Rol Created!'
    });
  };

  static deleteRol: Handler = async (req, res) => {
    const id = parseInt(req.params.id);

    await RolService.delete(id);

    res.status(OK).json({
      statusCode: OK,
      message: 'Rol Deleted!'
    });
  };

  static updateRolData: Handler = async (req, res) => {
    const id = parseInt(req.params.id);

    const { nameRol } = req.body;

    const rol = await RolService.updateData(id, nameRol);

    res.status(OK).json({
      statusCode: OK,
      data: rol,
      message: 'Rol Updated!'
    });
  };
}
