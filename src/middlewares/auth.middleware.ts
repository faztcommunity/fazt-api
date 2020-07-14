import { IPayload } from '../utils/auth';
import { Request, Response, NextFunction } from 'express';
import { UNAUTHORIZED } from 'http-status-codes';
import { ErrorHandler } from '../error';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers['authorization'] || '';
  if (!token) {
    next(new ErrorHandler(UNAUTHORIZED, 'no token provided'));
    return;
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET) as IPayload;
    req.user = payload.user;
    next();
  } catch (err) {
    next(err);
  }
};
