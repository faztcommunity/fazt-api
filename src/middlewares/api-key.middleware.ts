// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.

import { ErrorHandler } from '../error';
import { UNAUTHORIZED } from 'http-status-codes';
import { API_KEY } from '../config';

const publicRoutes = ['api-docs', 'uploads'];

const apiKeyMiddleware: Handler = (req, res, next) => {
  const apiKey = req.headers['api-key'];
  const url = req.url.split('/')[1];
  if (publicRoutes.includes(url)) return next();

  if (!apiKey || apiKey !== API_KEY)
    throw new ErrorHandler(UNAUTHORIZED, 'api key is required');

  if (apiKey === API_KEY) {
    next();
  }
};

export default apiKeyMiddleware;
