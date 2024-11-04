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

router.get(
  "/:roomId",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  RoomController.getSingleRoom
);

router.put(
  "/:roomId",
  auth(USER_ROLE.ADMIN),
  validateZodRequest(zodRoomSchema.roomUpdateZodSchema),
  RoomController.updateSingleRoom
);

router.delete(
  "/:roomId",
  auth(USER_ROLE.ADMIN),
  RoomController.deleteSingleRoom
);

router.get(
  "/",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  RoomController.getAllRoom
);

export const RoomRoutes = router;
