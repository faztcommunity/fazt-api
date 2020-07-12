// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.
import jwt from "jsonwebtoken";
import { Request } from "express";

import { JWT_SECRET } from "../config";

interface IPayload {
  user: {
    id: string;
  };
}
export const generateAndSignToken = async (payload: IPayload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: 60 * 60 * 60 });
};

export const decodeToken = (token: string) => {
  try {
    const payload = jwt.verify(token, JWT_SECRET as string) as IPayload;
    if (!payload) {
      return;
    }
    return payload;
  } catch (error) {
    return error;
  }
};

export const decodeAuthorization = (req: Request) => {
  try {
    const authorization = req.headers.authorization || "";
    const token = authorization.replace(/['"]+/g, "");
    if (!token) {
      return;
    }
    return token;
  } catch (error) {
    return error;
  }
};
