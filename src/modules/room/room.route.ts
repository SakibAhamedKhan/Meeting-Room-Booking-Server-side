import express, { Router } from "express";
import validateZodRequest from "../../middleware/validateZodRequest";
import { zodRoomSchema } from "./room.validation";
import { RoomController } from "./room.controller";

const router = express.Router();

router.post(
  "/",
  validateZodRequest(zodRoomSchema.roomZodSchema),
  RoomController.createRoom
);

export const RoomRoutes = router;