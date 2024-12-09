import express from "express";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";
import { FavouriteController } from "./favourite.controller";

const router = express.Router();

router.get(
    "/me",
    auth(USER_ROLE.ADMIN, USER_ROLE.CUSTOMER),
    FavouriteController.getAllFavouriteMe
)

router.post(
    "/me",
    auth(USER_ROLE.CUSTOMER),
    FavouriteController.makeRoomFavourite
)

router.delete(
    "/me",
    auth(USER_ROLE.ADMIN, USER_ROLE.CUSTOMER),
    FavouriteController.deleteRoomFavourite
)

export const FavouriteRoutes = router;