import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AppError } from "../types/AppError";

function errorMiddleWare(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ZodError) {
    res.status(411).json({
      success: false,
      message: "validation failed",
      errors: err.errors.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      })),
    });
    return;
  }

  if (err instanceof AppError) {
    res.status(err.status).json({
      success: false,
      message: err.message,
    });
    return;
  }

  //fallback error
  res.status(500).json({
    success: false,
    message: "server or internal issue",
  });
}

export default errorMiddleWare;
