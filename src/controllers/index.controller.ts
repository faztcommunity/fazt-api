// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.
import { Request, Response } from 'express';
const pkg = require('../../package.json');

export const welcomeMessage: Handler = (req: Request, res: Response) => {
  return res.status(200).json({
    name: pkg.name,
    version: pkg.version,
    homepage: pkg.homepage
  });
};
