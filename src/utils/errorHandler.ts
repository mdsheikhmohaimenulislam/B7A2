import type { Response } from "express";

type TError<T> = {
  status: number;
  success: boolean;
  message?: string;
  data?: T;
  error?: unknown;
};
const sendErrorResponse = <T>(res: Response, data: TError<T>) => {
  return res.status(data.status).json({
    success: data.success,
    message: data.message,
    data: data.data,
    error: data.error,
  });
};

export default sendErrorResponse;
