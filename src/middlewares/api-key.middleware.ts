// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.

import { ErrorHandler } from '../error';
import { UNAUTHORIZED } from 'http-status-codes';
import { API_KEY } from '../config';

const ApiKeyMiddleware: Handler = (req, res, next) => {
  const apiKey = req.headers['api-key'];
  if (!apiKey || apiKey !== API_KEY)
    throw new ErrorHandler(UNAUTHORIZED, 'api key is required');

  if (apiKey === API_KEY) {
    next();
  }
};

export default ApiKeyMiddleware;
