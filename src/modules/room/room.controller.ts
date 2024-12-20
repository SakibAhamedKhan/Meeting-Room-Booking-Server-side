import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { RoomService } from "./room.service";
import { MulterFileFields } from "./room.interface";
import { getUser } from "../../utils/getUser";

const createRoom = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const roomData = req.body;
    const files = req.files as MulterFileFields;
    const extraImages = files.extraImages;
    const thumbnail = files.thumbnail;

    const user = await getUser(req);

    const result = await RoomService.createRoom(
      roomData,
      extraImages,
      thumbnail,
      user
    );

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Room added successfully",
      data: result,
    });
  }
);

const getSingleRoom = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { roomId } = req.params;
    const token = req.headers.authorization as string;
    let user = null;
    if(token){
      user = await getUser(req);
    }
    
    const result = await RoomService.getSingleRoom(roomId, user);

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

const getAllRoomOperation = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await getUser(req);
    const result = await RoomService.getAllRoomOperation(user, req.query);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Room retrieved successfully",
      meta: result.meta,
      data: result.result,
    });
  }
);

const activateRoom = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { roomId } = req.params;
    const result = await RoomService.activateRoom(roomId);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Room activate successfully",
      data: result,
    });
  }
);

const getAllActivatedRoom = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await RoomService.getAllActivatedRoom(req.query);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "All activated Room retrieved successfully",
      meta: result.meta,
      data: result.result,
    });
  }
);

const deActivateRoom = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { roomId } = req.params;
    const result = await RoomService.deActivateRoom(roomId);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Room deactivate successfully",
      data: result,
    });
  }
);

const declinedRoom = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { roomId } = req.params;
    const result = await RoomService.declinedRoom(roomId);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Room declined successfully",
      data: result,
    });
  }
);

const publishRoom = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { roomId } = req.params;
    const user = await getUser(req);
    const result = await RoomService.publishRoom(user,roomId);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Room published successfully",
      data: result,
    });
  }
);

const unPublishRoom = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { roomId } = req.params;
    const user = await getUser(req);
    const result = await RoomService.unPublishRoom(user,roomId);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Room unPublished successfully",
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
  getAllRoomOperation,
  activateRoom,
  getAllActivatedRoom,
  deActivateRoom,
  declinedRoom,
  publishRoom,
  unPublishRoom,
};
