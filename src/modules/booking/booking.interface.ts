import { Schema } from "mongoose";
import { IS_CONFIRME } from "./booking.constant";

export type TBookingSchema = {
  room: Schema.Types.ObjectId;
  slots: [Schema.Types.ObjectId];
  user: Schema.Types.ObjectId;
  date: Date;
  totalAmount: number;
  isConfirmed: keyof typeof IS_CONFIRME;
  isDeleted: boolean;
};
