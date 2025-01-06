import express, { NextFunction, Request, Response, Router } from "express";
import { zodUserSchema } from "../user/user.validation";
import validateZodRequest from "../../middleware/validateZodRequest";
import { AuthController } from "./auth.controller";


const router = express.Router();

router.post(
  "/signup",
  validateZodRequest(zodUserSchema.signupZodSchema),
  AuthController.signup
);

router.post(
    "/login",
    validateZodRequest(zodUserSchema.loginZod),
    AuthController.login
)

router.get(
  '/refresh-token',
  // validateZodRequest(AuthValidation.refreshTokenValidationSchema),
  // (req:Request, res:Response, next:NextFunction)=>{
  //   console.log(req.cookies)
  //   next();
  // },
  AuthController.refreshToken,
);

router.get('/get-user',AuthController.geIndivisiualtUser)



export const AuthRoutes = router;
