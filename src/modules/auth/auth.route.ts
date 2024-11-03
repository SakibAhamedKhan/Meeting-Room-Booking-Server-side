import express, { Router } from "express";
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


export const AuthRoutes = router;
