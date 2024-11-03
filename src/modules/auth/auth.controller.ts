import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import httpStatus from "http-status-codes";
import { USER_ROLE } from "../user/user.constant";
import { AuthService } from "./auth.service";

const signup = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userData = req.body;
    userData.role = USER_ROLE.USER;

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
    const result = await AuthService.login(userData);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Login successfully",
      data: result,
    });
  }
);

export const AuthController = {
  signup,
  login,
};
