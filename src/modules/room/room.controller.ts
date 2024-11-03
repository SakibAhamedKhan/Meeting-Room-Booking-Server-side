import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { RoomService } from "./room.service";


const createRoom = catchAsync(
    async(req:Request, res:Response, next:NextFunction)=>{
        const roomData = req.body;
        roomData.isDeleted = false;
        const result = await RoomService.createRoom(roomData);

        res.status(200).json({
            success: true, 
            statusCode: 200, 
            message: "Room added successfully" ,
            data: result,
        })
    }
)

export const RoomController = {
    createRoom,
}