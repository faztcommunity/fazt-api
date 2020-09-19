import { Handler } from 'express';
import { OK } from 'http-status-codes';
import { UserService } from '../services/user.service';
import { JWT } from '../utils/jwt';

export class UserController {
  static getUsers: Handler = async (req, res) => {
    const users = await UserService.getAll();

    res.status(OK).json({
      statusCode: OK,
      data: users,
      message: 'Ok!'
    });
  };

  static createUser: Handler = async (req, res) => {
    const user = await UserService.create(req.body);
    const token = JWT.generateToken({ user: { id: user.id } });

    res.status(OK).json({
      statusCode: OK,
      data: token,
      message: 'User Created!'
    });
  };

  static logIn: Handler = async (req, res) => {
    const { email, password } = req.body;

    const user = await UserService.logIn(email, password);
    const token = JWT.generateToken({ user: { id: user.id } });

    res.status(OK).json({
      statusCode: OK,
      data: token,
      message: 'User Logged!'
    });
  };

  static getUser: Handler = async (req, res) => {
    const user = await UserService.getOne(req.user.id);

    res.status(OK).json({
      statusCode: OK,
      data: user
    });
  };

  static deleteUser: Handler = async (req, res) => {
    await UserService.delete(req.user.id);

    res.status(OK).json({
      statusCode: OK,
      message: 'User Deleted!'
    });
  };

  static updateUserData: Handler = async (req, res) => {
    const user = await UserService.updateData(req.user.id, req.body);

    res.status(200).json({
      statusCode: OK,
      data: user,
      message: 'User Updated!'
    });
  };
}
