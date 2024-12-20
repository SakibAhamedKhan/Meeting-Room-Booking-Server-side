"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const bookings_service_1 = require("./bookings.service");
const getUser_1 = require("../../utils/getUser");
const createBooking = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingData = req.body;
    const user = yield (0, getUser_1.getUser)(req);
    const result = yield bookings_service_1.BookingService.createBooking(bookingData, user);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Booking created successfully",
        data: result,
    });
}));
const getAllBooking = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bookings_service_1.BookingService.getAllBooking();
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "All bookings retrieved successfully",
        data: result,
    });
}));
const getMyBooking = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, getUser_1.getUser)(req);
    const result = yield bookings_service_1.BookingService.getMyBooking(user._id);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "User bookings retrieved successfully",
        data: result,
    });
}));
const updateBooking = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const updateData = req.body;
    const { id } = req.params;
    const result = yield bookings_service_1.BookingService.updateBooking(id, updateData);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Booking updated successfully",
        data: result,
    });
}));
const deleteBooking = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield bookings_service_1.BookingService.deleteBooking(id);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Booking deleted successfully",
        data: result,
    });
}));
exports.BookingController = {
    createBooking,
    getAllBooking,
    getMyBooking,
    updateBooking,
    deleteBooking,
};
