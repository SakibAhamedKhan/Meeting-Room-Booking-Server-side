import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { USER_ROLE } from "../user/user.constant";
import { AuthService } from "./auth.service";
import config from "../../config";
import { getUser } from "../../utils/getUser";

const signup = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userData = req.body;
    userData.role = USER_ROLE.CUSTOMER;

    const result = await AuthService.signup(userData);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User registered successfully",
      data: result,
    });
  }
);

const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userData = req.body;
    const { accessToken, refreshToken } = await AuthService.login(userData);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: config.node_env === "production",
    });
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Login successfully",
      data: {
        accessToken,
      },
    });
  }
);

const refreshToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { refreshToken } = req.cookies;
    const result = await AuthService.refreshToken(refreshToken);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Access token is retrieved successfully!',
      data: result,
    });
  }
);

const geIndivisiualtUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user:any = await getUser(req);
    console.log(user)
    const result = await AuthService.geIndivisiualtUser(user?._id);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'User information retrieved successfully!',
      data: result,
    });
  }
);

export const AuthController = {
  signup,
  login,
  refreshToken,
  geIndivisiualtUser,
};
