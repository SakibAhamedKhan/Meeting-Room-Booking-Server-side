import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";


const register = async(req:Request, res:Response, next:NextFunction) => {
    const result = await UserService.register(req.body)
}