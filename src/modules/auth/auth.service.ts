import config from "../../config";
import AppError from "../../errors/AppError";
import { TUserLogin, TUserSchema } from "../user/user.interface";
import { User } from "../user/user.model";
import { createToken, isPasswordMatched, verifyToken } from "./auth.util";
import jwt from "jsonwebtoken";

const signup = async (payload: TUserSchema) => {
  const result = await User.create(payload);
  return result;
};

const login = async (payload: TUserLogin): Promise<any> => {
  const user = await User.findOne({ email: payload.email });

  if (!user) {
    throw new AppError(404, "User not found!");
  }

  const passwordMatched = await isPasswordMatched(
    payload.password,
    user.password
  );
  if (!passwordMatched) {
    throw new AppError(401, "Invalid password. Please try again.");
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expries,
  });

  const refreshToken = jwt.sign(
    jwtPayload,
    config.jwt_refresh_secret as string,
    {
      expiresIn: config.jwt_refresh_expries,
    }
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string) => {
  const decoded = verifyToken(token, config.jwt_refresh_secret as string);

  const { email, iat } = decoded;

  const user = await User.isUserExistsByCustomEmail(email);

  if (!user) {
    throw new AppError(404, "This user is not found !");
  }

  const userStatus = user?.status;

  if (userStatus === "blocked") {
    throw new AppError(402, "This user is blocked ! !");
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expries as string
  );
  
};

export const AuthService = {
  signup,
  login,
  refreshToken,
};
