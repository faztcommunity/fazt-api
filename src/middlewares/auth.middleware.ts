// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.

import { UNAUTHORIZED } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { ErrorHandler } from '../error';
import { JWT_SECRET } from '../config';

const authMiddleware: Handler = async (req, res, next) => {
  const token = req.headers['authorization'] || '';

  if (!token) {
    next(new ErrorHandler(UNAUTHORIZED, 'no token provided'));
    return;
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as IPayload;
    //console.log(payload);
    req.user = payload.user;
    next();
  } catch (err) {
    next(err);
  }
};

export default authMiddleware;
