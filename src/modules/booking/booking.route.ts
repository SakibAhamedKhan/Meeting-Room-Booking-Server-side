import express from "express";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";
import { BookingController } from "./booking.controller";
import validateZodRequest from "../../middleware/validateZodRequest";
import { zodBookingSchema } from "./booking.validation";

const router = express.Router();

router.post(
  "/",
  auth(USER_ROLE.ADMIN, USER_ROLE.CUSTOMER),
  validateZodRequest(zodBookingSchema.bookingZodSchema),
  BookingController.createBooking
);

router.get("/customer",
  auth(USER_ROLE.ADMIN, USER_ROLE.CUSTOMER, USER_ROLE.PARTNER),
  BookingController.getAllCustomerBooking);

router.patch("/customer/paid/:id",
  auth(USER_ROLE.ADMIN, USER_ROLE.CUSTOMER, USER_ROLE.PARTNER),
  BookingController.giveCustomerBookingPaid);

router.delete("/customer/cancel/:id",
  auth(USER_ROLE.ADMIN, USER_ROLE.CUSTOMER, USER_ROLE.PARTNER),
  BookingController.giveCustomerBookingCancel);

// router.get("/partner",
//   auth(USER_ROLE.ADMIN, USER_ROLE.CUSTOMER, USER_ROLE.PARTNER),
//   BookingController.getAllPartnerBooking);

router.get("/",
  auth(USER_ROLE.ADMIN, USER_ROLE.CUSTOMER, USER_ROLE.PARTNER),
  BookingController.getAllBooking);

router.get("/my-bookings",
  auth(USER_ROLE.ADMIN, USER_ROLE.CUSTOMER),
  BookingController.getMyBooking);

router.put("/:id",
  auth(USER_ROLE.ADMIN),
  BookingController.updateBooking);

router.delete("/:id",
  auth(USER_ROLE.ADMIN),
  BookingController.deleteBooking);


export const BookingRoutes = router;
