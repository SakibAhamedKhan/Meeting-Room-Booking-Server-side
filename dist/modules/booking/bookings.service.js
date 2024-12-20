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
exports.BookingService = void 0;
const slot_service_1 = require("../slot/slot.service");
const booking_model_1 = require("./booking.model");
const room_service_1 = require("../room/room.service");
const createBooking = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const slotsArray = payload.slots;
    const udpate = yield slot_service_1.SlotService.updateSlotsBooked(slotsArray, true);
    const roomSingle = yield room_service_1.RoomService.getSingleRoom(payload.room, user);
    payload.totalAmount = ((roomSingle === null || roomSingle === void 0 ? void 0 : roomSingle.pricePerSlot) *
        slotsArray.length);
    const result = (yield (yield (yield booking_model_1.Booking.create(payload)).populate("slots")).populate("room")).populate("user");
    return result;
});
const getAllBooking = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.find()
        .populate("slots")
        .populate("room")
        .populate("user");
    return result;
});
const getMyBooking = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.find({ user: id })
        .populate("slots")
        .populate("room")
        .populate("user");
    return result;
});
const updateBooking = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const update = yield booking_model_1.Booking.updateOne({ _id: id }, payload);
    const result = yield booking_model_1.Booking.findOne({ _id: id });
    return result;
});
const deleteBooking = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.findOne({ _id: id });
    const slotsArray = result === null || result === void 0 ? void 0 : result.slots;
    const udpate = yield slot_service_1.SlotService.updateSlotsBooked(slotsArray, false);
    const deleteOne = yield booking_model_1.Booking.deleteOne({ _id: id });
    return result;
});
exports.BookingService = {
    createBooking,
    getAllBooking,
    getMyBooking,
    updateBooking,
    deleteBooking,
};
