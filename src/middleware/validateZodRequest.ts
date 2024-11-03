import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const validateZodRequest = (schema: AnyZodObject) => {
    return async(req:Request, res: Response, next:NextFunction) => {
        try {
            const parseBody = await schema.parseAsync(req.body);
            req.body = parseBody;
            next();
        } catch (error) {
            console.log("hehehehehe");
            next(error);
        }
    }
}

export default validateZodRequest;