"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zodBookingSchema = void 0;
const zod_1 = require("zod");
const booking_constant_1 = require("./booking.constant");
const bookingZodSchema = zod_1.z.object({
    room: zod_1.z
        .string({ message: "Room id is required and must be a valid UUID" }),
    slots: zod_1.z
        .array(zod_1.z.string({ message: "Each Slot id must be a valid UUID" }))
        .nonempty({ message: "At least one Slot id is required" }),
    user: zod_1.z
        .string({ message: "User id is required and must be a valid UUID" }),
    date: zod_1.z.string().date("Please provide a valid date in this format YYYY-MM-DD"),
    totalAmount: zod_1.z.number().optional(),
    isConfirmed: zod_1.z.enum([booking_constant_1.IS_CONFIRME.unconfirmed, booking_constant_1.IS_CONFIRME.confirmed, booking_constant_1.IS_CONFIRME.canceled], {
        message: "isConfirmed must be either 'unconfirmed' or 'confirmed' or 'cancel",
    }).optional(),
    isDeleted: zod_1.z.boolean().default(false).optional(),
});
exports.zodBookingSchema = {
    bookingZodSchema,
};
