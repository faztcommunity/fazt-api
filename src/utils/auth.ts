// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.

import jwt from 'jsonwebtoken';
import { JWT_SECRET, TOKEN_EXPIRY_TIME } from '../config';

export const generateAndSignToken = async (payload: IPayload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY_TIME });
};
