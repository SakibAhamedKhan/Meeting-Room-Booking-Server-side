import { NextFunction, Request, Response } from "express";
import { TUserRoles } from "../modules/user/user.interface";
import { catchAsync } from "../utils/catchAsync";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import app from "../app";
import { User } from "../modules/user/user.model";

const auth = (...requiredRoles: TUserRoles[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;

    console.log(decoded);
    const { role, userId, iat } = decoded;

    // checking if the user is exist
    const user = await User.findOne({ _id:userId  });
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "This user is not found");
    }

    if (!requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You are not authorized to access this route"
      );
    }

    next();
  });
};

export default auth;
