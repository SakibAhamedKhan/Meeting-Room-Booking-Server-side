import { model, Schema } from "mongoose";
import { TFavouriteSchema } from "./favourite.interface";

const favouriteSchema = new Schema<TFavouriteSchema>({
  user: {
    type: Schema.Types.ObjectId,
    require: [true, "user id is required"],
    ref: "User",
  },
  room: {
    type: Schema.Types.ObjectId,
    require: [true, "user id is required"],
    ref: "Room",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Favourite = model<TFavouriteSchema>("Favourite", favouriteSchema);
