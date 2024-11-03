import express, { Router } from "express";
import validateZodRequest from "../../middleware/validateZodRequest";
import { zodRoomSchema } from "./room.validation";
import { RoomController } from "./room.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/",
  auth(USER_ROLE.ADMIN),
  validateZodRequest(zodRoomSchema.roomZodSchema),
  RoomController.createRoom
);

export const RoomRoutes = router;