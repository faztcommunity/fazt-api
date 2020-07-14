// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.

import { Response, Request, NextFunction } from 'express';

import { handleError } from '../error';

const handleErrorMiddleware = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  handleError(err, res);
};

export default handleErrorMiddleware;
