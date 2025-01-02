import { Schema, model } from "mongoose";
import { IS_CONFIRME } from "./booking.constant";
import { TBookingSchema } from "./booking.interface";

const bookingSchema = new Schema<TBookingSchema>({
  room: {
    type: Schema.Types.ObjectId,
    require: [true, "Room id is required"],
    ref: "Room",
  },
  slots: {
    type: [Schema.Types.ObjectId],
    require: [true, "Slot is required"],
    ref: "Slot",
  },
  user: {
    type: Schema.Types.ObjectId,
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
    enum: Object.keys(IS_CONFIRME),
    default: IS_CONFIRME.unconfirmed,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Booking = model<TBookingSchema>("Booking", bookingSchema);
