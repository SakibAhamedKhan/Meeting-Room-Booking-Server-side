"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constant_1 = require("../user/user.constant");
const booking_controller_1 = require("./booking.controller");
const validateZodRequest_1 = __importDefault(require("../../middleware/validateZodRequest"));
const booking_validation_1 = require("./booking.validation");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN, user_constant_1.USER_ROLE.CUSTOMER), (0, validateZodRequest_1.default)(booking_validation_1.zodBookingSchema.bookingZodSchema), booking_controller_1.BookingController.createBooking);
router.get("/", (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN), booking_controller_1.BookingController.getAllBooking);
router.get("/my-bookings", (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN, user_constant_1.USER_ROLE.CUSTOMER), booking_controller_1.BookingController.getMyBooking);
router.put("/:id", (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN), booking_controller_1.BookingController.updateBooking);
router.delete("/:id", (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN), booking_controller_1.BookingController.deleteBooking);
exports.BookingRoutes = router;
