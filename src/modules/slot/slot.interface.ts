import { Schema } from "mongoose";

export type TSlotSchema = {
  room: Schema.Types.ObjectId;
  owner: Schema.Types.ObjectId;
  // date: Date;
  startTime: string;
  endTime: string;
  // isBooked: boolean;
};
