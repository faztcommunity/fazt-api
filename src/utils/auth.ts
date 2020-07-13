import jwt from 'jsonwebtoken';
import { JWT_SECRET, TOKEN_EXPIRY_TIME } from '../config';

export const generateAndSignToken = async (payload: IPayload) => {
  return await jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY_TIME });
};
