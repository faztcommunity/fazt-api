import { Request, Response, NextFunction } from 'express';

export function handleError(err: any, _req: Request, res: Response, _next: NextFunction) {
  const { message, statusCode = 500 } = err;
  res.status(statusCode).json({ status: 'error', message, statusCode });
}
