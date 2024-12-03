import express, { NextFunction, Request, Response } from "express";
import validateZodRequest from "../../middleware/validateZodRequest";
import { zodRoomSchema } from "./room.validation";
import { RoomController } from "./room.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";
import { upload } from "../../utils/sendImageToCloudinary";

const router = express.Router();

router.post(
  "/",
  auth(USER_ROLE.ADMIN, USER_ROLE.PARTNER),
  
  upload.fields([
    { name: 'extraImages', maxCount: 10 },  
    { name: 'thumbnail', maxCount: 1 }     
  ]),
  (req: Request, res: Response, next: NextFunction) => {
    console.log(req.files);
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateZodRequest(zodRoomSchema.roomZodSchema),
  RoomController.createRoom
);

router.get(
  "/:roomId",
  // auth(USER_ROLE.ADMIN, USER_ROLE.CUSTOMER),
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
  // auth(USER_ROLE.ADMIN, USER_ROLE.CUSTOMER),
  RoomController.getAllRoom
);

export const RoomRoutes = router;
