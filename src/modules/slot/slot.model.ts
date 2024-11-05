import { model, Schema } from "mongoose";
import { TSlotSchema } from "./slot.interface";

const slotSchema = new Schema<TSlotSchema>({
  room: {
    type: Schema.Types.ObjectId,
    require: [true, "Room id is required"],
    ref: "Room",
  },
  date: {
    type: Date,
    require: [true, "Date is required"],
  },
  startTime: {
    type: String,
    require: [true, "Start time is required"],
  },
  endTime: {
    type: String,
    require: [true, "End time is required"],
  },
  isBooked: {
    type: Boolean,
    default: false,
  },
});

export const Slot = model<TSlotSchema>("Slot", slotSchema);
