import { NextFunction, Request, Response } from "express";
import { string } from "zod";

export const catchAsync = (fn: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((error: string) => {
        // res.status(500).json({
        //     success: false, 
        //     message: "Could not fected successfully", 
        //     error: error, 
        // })
        next(error);
    });
  };
};
