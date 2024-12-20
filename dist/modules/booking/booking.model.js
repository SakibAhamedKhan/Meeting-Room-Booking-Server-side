"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = require("mongoose");
const booking_constant_1 = require("./booking.constant");
const bookingSchema = new mongoose_1.Schema({
    room: {
        type: mongoose_1.Schema.Types.ObjectId,
        require: [true, "Room id is required"],
        ref: "Room",
    },
    slots: {
        type: [mongoose_1.Schema.Types.ObjectId],
        require: [true, "Slot is required"],
        ref: "Slot",
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        require: [true, "User is required"],
        ref: "User",
    },
    date: {
        type: Date,
        require: [true, "Date is required"],
    },
    totalAmount: {
        type: Number,
    },
    isConfirmed: {
        type: String,
        require: [true, "isConfirmed is reqruired"],
        enum: Object.keys(booking_constant_1.IS_CONFIRME),
        default: booking_constant_1.IS_CONFIRME.unconfirmed,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
});
exports.Booking = (0, mongoose_1.model)("Booking", bookingSchema);
