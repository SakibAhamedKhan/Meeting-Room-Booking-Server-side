import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { getUser } from "../../utils/getUser";
import { FavouriteService } from "./favourite.service";

const getAllFavouriteMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await getUser(req);
    const result = await FavouriteService.getAllFavouriteMe(
      user?._id,
      req.query
    );

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: `Favourite rooms retrived successfully`,
      meta: result.meta,
      data: result.result,
    });
  }
);

const makeRoomFavourite = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await getUser(req);
    const favouriteData = req.body;
    favouriteData.user = user._id;
    const result = await FavouriteService.makeRoomFavourite(favouriteData);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: `Favourite rooms added successfully`,
      data: result,
    });
  }
);

const makeRoomUnFavourite = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await getUser(req);
    const favouriteData = req.body;
    favouriteData.user = user._id;
    const result = await FavouriteService.makeRoomUnFavourite(favouriteData);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: `Favourite rooms added successfully`,
      data: result,
    });
  }
);

const deleteRoomFavourite = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await getUser(req);
    const favouriteData = req.body;
    favouriteData.user = user._id;
    const result = await FavouriteService.deleteRoomFavourite(favouriteData);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: `Favourite room deleted successfully`,
      data: result,
    });
  }
);

export const FavouriteController = {
  getAllFavouriteMe,
  makeRoomFavourite,
  deleteRoomFavourite,
  makeRoomUnFavourite,
};
