import { Response } from "express";
import { ErrorCodes, SuccessCodes } from "../types/httpCodes";

interface HttpResponse {
  message: string;
  data?: any;
}

export interface HTTPError extends HttpResponse {
  code: ErrorCodes;
}

export interface HTTPSuccess extends HttpResponse {
  code: SuccessCodes;
}

export const success = (res: Response, data: HTTPSuccess) =>
  res.status(data.code).send(data);

export const error = (res: Response, data: HTTPError) =>
  res.status(data.code).send(data);
