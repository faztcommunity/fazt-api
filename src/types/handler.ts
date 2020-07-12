// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.
import { Request, Response, NextFunction } from 'express';

export type Handler = (
  req: Request,
  res: Response,
  next?: NextFunction
) => Promise<Response> | Response;
