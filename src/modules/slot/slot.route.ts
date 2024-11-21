import express from "express"
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";
import { SlotController } from "./slot.controller";

const router = express.Router();


router.post(
    "/",
    auth(USER_ROLE.ADMIN),
    SlotController.createSlot
);

router.get(
    "/availability",
    auth(USER_ROLE.ADMIN, USER_ROLE.CUSTOMER),
    SlotController.getAvaliableSlots
)

export const SlotRoutes = router;