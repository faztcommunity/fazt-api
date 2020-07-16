// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.

import { ErrorHandler } from '../error';
import { UNAUTHORIZED } from 'http-status-codes';
import { API_KEY } from '../config';

const apiKeyMiddleware: Handler = (req, res, next) => {
  const apiKey = req.headers['api-key'];
  const url = req.url.split('/')[1];
  if (url === 'api-docs') return next();

  if (!apiKey || apiKey !== API_KEY)
    throw new ErrorHandler(UNAUTHORIZED, 'api key is required');

  if (apiKey === API_KEY) {
    next();
  }
};

export default apiKeyMiddleware;
