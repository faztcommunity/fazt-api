import { Request, Response } from 'express';

export type Handler = (
  req: Request,
  res: Response
) => Promise<Response> | Response;
