// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.

import { Response, Request, NextFunction } from 'express';
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { MongoError } from 'mongodb';
import { Error as MongooseError } from 'mongoose';
import { JsonWebTokenError } from 'jsonwebtoken';

export class ErrorHandler extends Error {
  statusCode: number;

  constructor(statusCode: number, message: any, trace?: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.stack = trace;
  }
}

export const handleError = (err: ErrorHandler, res: Response) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message
  });
};

const errorParse = (error: Error, next: NextFunction) => {
  if (
    error instanceof MongooseError.ValidationError ||
    error instanceof MongooseError.CastError ||
    error instanceof MongoError ||
    error instanceof JsonWebTokenError
  )
    next(new ErrorHandler(BAD_REQUEST, error.message, error.stack));
  else if (error instanceof ErrorHandler) next(error);
  else
    next(new ErrorHandler(INTERNAL_SERVER_ERROR, 'Error Perfoming Action', error.stack));
};

export const handlerExceptionRoute = (fn: Handler): any => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const route = fn(req, res, next);

    if (route instanceof Promise) {
      route?.catch((error: Error) => {
        errorParse(error, next);
      });
    }
  } catch (error) {
    errorParse(error, next);
  }
};
