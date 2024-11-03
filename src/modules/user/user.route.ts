import express, { Router } from "express";
import { UserController } from "./user.controller";
import validateZodRequest from "../../middleware/validateZodRequest";
import { zodUserSchema } from "./user.validation";

const router = express.Router();



export const UserRoutes = router;
