import { NextFunction, Request, Response } from "express";
import { handleCastError } from "../errors/handleCastError";
import { handleValidationError } from "../errors/handleValidationError";
import { ZodError } from "zod";
import { handleDuplicateError } from "../errors/handleDuplicateError";
import { handleZodError } from "../errors/handleZodError";
import AppError from "../errors/AppError";

export const globalErrorHandaler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Something went wrong";
  let errorSources = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  if(err.name=="CastError"){
    const simplified = handleCastError(err);
    message = simplified.message;
    errorSources = simplified.errorSource;
  } else if(err.name === "ValidationError"){
    const simplified  = handleValidationError(err);
    message = simplified.message;
    errorSources = simplified.errorSource;
  } else if (err.code === 11000) {
    const simplified = handleDuplicateError(err);
    errorSources = simplified.errorSource;
  } else if (err instanceof ZodError) {
    const simplified = handleZodError(err);
    errorSources = simplified.errorSource;
    statusCode = simplified.statusCode;
    message = simplified.message;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err.message;
    errorSources = [
      {
        path: "",
        message: err?.message,
      },
    ];
  }

  res.status(statusCode).json({
    // global:true,
    success: false,
    message,
    errorSources,
    err,
  });
  
};
