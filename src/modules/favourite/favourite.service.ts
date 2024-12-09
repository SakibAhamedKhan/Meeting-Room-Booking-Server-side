import { QueryBuilder } from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { TFavouriteSchema } from "./favourite.interface";
import { Favourite } from "./favourite.model";

const getAllFavouriteMe = async (
  userId: string,
  payload: Record<string, unknown>
) => {
  let result, meta;
  const resultQuery = new QueryBuilder(
    Favourite.find({ user: userId }).populate("room").populate("user"),
    payload
  ).pagination();
  result = await resultQuery.modelQuery;
  meta = await resultQuery.countTotal();

  return {
    result,
    meta,
  };
};

const makeRoomFavourite = async (payload: TFavouriteSchema) => {
  const fav = await Favourite.findOne({
    user: payload.user,
    room: payload.room,
  });
  if (fav) {
    throw new AppError(409, "This Room is already in your favourite list!");
  }
  const result = await Favourite.create(payload);
  return result;
};

const deleteRoomFavourite = async (payload: TFavouriteSchema) => {
  const result = await Favourite.deleteOne({
    user: payload.user,
    room: payload.room,
  });
  return result;
};

export const FavouriteService = {
  getAllFavouriteMe,
  makeRoomFavourite,
  deleteRoomFavourite,
};
