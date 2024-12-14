import { Request } from "express";
import { ObjectId } from "mongoose";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { User } from "../modules/user/user.model";
import { TUserSchema } from "../modules/user/user.interface";

export const getUser = async (req: Request): Promise<any> => {
  const token = req.headers.authorization as string;
  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string
  ) as JwtPayload;
  const { role, userId, iat } = decoded;
  const user = await User.findOne({ _id: userId });

  return user;
};
