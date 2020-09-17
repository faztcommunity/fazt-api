import { Handler } from 'express';
import { JWT } from '../utils/jwt';
import { ErrorHandler } from '../error';
import { Roles } from '../common/roles/default';
import { RolUserService } from '../services/rol-user.service';

import { BAD_REQUEST } from 'http-status-codes';

export const auth: Handler = (req, res, next) => {
  let token = req.headers['authorization'];
  if (!token) {
    next(new ErrorHandler(BAD_REQUEST, 'Token is Required'));
    return;
  }

  try {
    token = token.split(' ')[1];
    const payload = JWT.verifyToken(token);
    req.user = payload.user;
    next();
  } catch (err) {
    next(new ErrorHandler(BAD_REQUEST, 'Invalid Token'));
  }
};

export const isAdmin: Handler = async (req, res, next) => {
  const existRol = await RolUserService.checkRol(req.user.id, Roles.ADMIN);
  if (!existRol) {
    next(new ErrorHandler(BAD_REQUEST, 'Invalid permission'));
    return;
  }

  next();
};

export const isLeader: Handler = async (req, res, next) => {
  const existRol = await RolUserService.checkRol(req.user.id, Roles.LEADER);
  if (!existRol) {
    next(new ErrorHandler(BAD_REQUEST, 'Invalid permission'));
    return;
  }

  next();
};
