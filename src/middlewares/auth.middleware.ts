import { Handler } from 'express';
import { JWT } from '../utils/jwt';
import { ErrorHandler } from '../error';
import { BAD_REQUEST } from 'http-status-codes';

export const auth: Handler = (req, res, next) => {
  const token = req.headers['authorization'].split(' ')[1];
  if (!token) {
    next(new ErrorHandler(BAD_REQUEST, 'Token is Required'));
    return;
  }

  try {
    const payload = JWT.verifyToken(token);
    req.user = payload.user;
    next();
  } catch (err) {
    next(new ErrorHandler(BAD_REQUEST, 'Invalid Token'));
  }
};
