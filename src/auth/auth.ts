import jwt from "jsonwebtoken";
import { Request } from "express";

interface IPayload {
  user: {
    id: string;
  };
}
export const generateAndSignToken = async (payload: IPayload) => {
  return await jwt.sign(payload, "AFJDLSSECRET", { expiresIn: 60 * 60 * 60 });
};

export const decodeToken = (token: string) => {
  try {
    const payload = jwt.verify(token, "AFJDLSSECRET" as string) as IPayload;
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
