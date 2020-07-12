import { IncomingHttpHeaders } from 'http';
import { ErrorHandler } from '../../error';
import { UNAUTHORIZED } from 'http-status-codes';

import brycpt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export interface IPayload {
  sub: string;
}

export const hashPassword = async (unhashedPassword: string) => {
  const salt = await brycpt.genSalt();
  return await brycpt.hash(unhashedPassword, salt);
};

export const comparePassword = async (
  unhasedPassword: string,
  hashePassword: string
) => await brycpt.compare(unhasedPassword, hashePassword);

export const generateAndSignToken = (payload: IPayload) => {
  jwt.sign(payload, '6a6d66¡98afjdadec', { expiresIn: '1h' });
};

export const validateToken = ({
  authorization = ''
}: {
  authorization?: IncomingHttpHeaders['authorization'];
}) => {
  try {
    const token = authorization.replace(/['"]+/g, '');
    if (!token) {
      throw new ErrorHandler(UNAUTHORIZED, 'You dont send any token');
    }
    return jwt.verify(token, '6a6d66¡98afjdadec');
  } catch (error) {
    switch (error.message) {
      case 'jwt expired':
        throw new ErrorHandler(UNAUTHORIZED, 'Token expired');
      default:
        error.code = 401;
        throw new ErrorHandler(UNAUTHORIZED, 'ERROR');
    }
  }
};
