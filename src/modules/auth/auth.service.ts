import config from "../../config";
import AppError from "../../errors/AppError";
import { TUserLogin, TUserSchema } from "../user/user.interface";
import { User } from "../user/user.model";
import { createToken, isPasswordMatched, verifyToken } from "./auth.util";
import jwt from "jsonwebtoken";

const signup = async (payload: TUserSchema) => {
  payload.email = payload.email.toLowerCase();
  const result = await User.create(payload);
  return result;
};

const login = async (payload: TUserLogin): Promise<any> => {
  payload.email = payload.email.toLowerCase();
  const user = await User.findOne({ email: payload.email });

  if (!user) {
    throw new AppError(404, "User not found!");
  }

  const passwordMatched = await isPasswordMatched(
    payload.password,
    user.password
  );
  if (!passwordMatched) {
    throw new AppError(404, "Invalid password. Please try again.");
  }

  const jwtPayload = {
    userId: user._id,
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

  const { userId, iat } = decoded;

  const user = await User.isUserExistsByCustomUserId(userId);

  if (!user) {
    throw new AppError(404, "This user is not found !");
  }

  const userStatus = user?.status;

  if (userStatus === "blocked") {
    throw new AppError(402, "This user is blocked ! !");
  }

  const jwtPayload = {
    userId: user.userId,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expries as string
  );
  return {
    accessToken,
  };
};

const geIndivisiualtUser = async (id: string) => {
  const result = await User.findOne({_id:id})
  return {
    result,
  };
};

export const AuthService = {
  signup,
  login,
  refreshToken,
  geIndivisiualtUser,
};
