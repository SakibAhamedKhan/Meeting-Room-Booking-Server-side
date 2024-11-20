import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { RoomService } from "./room.service";
import { MulterFileFields } from "./room.interface";

const createRoom = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const roomData = req.body;
    const files = req.files as MulterFileFields;
    const extraImages = files.extraImages;
    const thumbnail = files.thumbnail;
    // roomData.isDeleted = false;
    const result = await RoomService.createRoom(roomData, extraImages, thumbnail);
    
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Room added successfully",
      data: "result",
    });
  }
);

const getSingleRoom = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { roomId } = req.params;
    const result = await RoomService.getSingleRoom(roomId);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Room retrieved successfully",
      data: result,
    });
  }
);

const updateSingleRoom = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { roomId } = req.params;
    const roomData = req.body;
    const result = await RoomService.updateSingleRoom(roomId, roomData);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Room updated successfully",
      data: result,
    });
  }
);

const deleteSingleRoom = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { roomId } = req.params;
    const result = await RoomService.deleteSingleRoom(roomId);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Room deleted successfully",
      data: result,
    });
  }
);

const getAllRoom = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await RoomService.getAllRoom();

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Room retrieved successfully",
      data: result,
    });
  }
);

export const RoomController = {
  createRoom,
  getSingleRoom,
  getAllRoom,
  updateSingleRoom,
  deleteSingleRoom,
};
