import { Request, Response, NextFunction } from 'express';

export function handleNotFound(req: Request, res: Response, _next: NextFunction) {
  const statusCode = 404;
  res.status(statusCode).json({ status: 'not found', url: req.url, statusCode });
}
