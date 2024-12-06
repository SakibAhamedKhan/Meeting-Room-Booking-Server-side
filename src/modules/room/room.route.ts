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
  RoomController.getAllRoom
);

router.get(
  "/checking/operations",
  auth(USER_ROLE.ADMIN, USER_ROLE.PARTNER),
  RoomController.getAllRoomOperation
);

router.patch(
  "/activate/:roomId",
  auth(USER_ROLE.ADMIN),
  RoomController.activateRoom
);

router.get(
  "/checking/activated",
  auth(USER_ROLE.ADMIN),
  RoomController.getAllActivatedRoom
);


router.patch(
  "/deactivate/:roomId",
  auth(USER_ROLE.ADMIN),
  RoomController.deActivateRoom
);

router.patch(
  "/declined/:roomId",
  auth(USER_ROLE.ADMIN),
  RoomController.declinedRoom
);

router.patch(
  "/publish/:roomId",
  auth(USER_ROLE.ADMIN, USER_ROLE.PARTNER),
  RoomController.publishRoom
);

router.patch(
  "/unpublish/:roomId",
  auth(USER_ROLE.ADMIN, USER_ROLE.PARTNER),
  RoomController.unPublishRoom
);

export const RoomRoutes = router;
