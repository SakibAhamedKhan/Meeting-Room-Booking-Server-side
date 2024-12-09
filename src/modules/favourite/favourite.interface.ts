import { Schema } from "mongoose";

export type TFavouriteSchema = {
  user: Schema.Types.ObjectId;
  room: Schema.Types.ObjectId;
  createdAt?: Date;
};
