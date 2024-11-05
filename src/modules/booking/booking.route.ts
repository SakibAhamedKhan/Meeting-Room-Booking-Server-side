import express from "express"
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";
import { BookingController } from "./booking.controller";
import validateZodRequest from "../../middleware/validateZodRequest";
import { zodBookingSchema } from "./booking.validation";

const router = express.Router();

router.post(
    "/",
    auth(USER_ROLE.ADMIN, USER_ROLE.USER),
    validateZodRequest(zodBookingSchema.bookingZodSchema),
    BookingController.createBooking
)

export const BookingRoutes = router;