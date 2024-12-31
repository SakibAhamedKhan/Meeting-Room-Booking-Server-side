import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { timeRelated } from "../../utils/timeRelated";
import { SlotService } from "./slot.service";
import { RoomService } from "../room/room.service";
import { getUser } from "../../utils/getUser";
import { TUserSchema } from "../user/user.interface";

const createSlot = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const slotData = req.body;
    const user = getUser(req) as any;
    slotData.owner = user._id;
    const startTimeObj = timeRelated.timeToMinutes(slotData.startTime);
    const endTimeObj = timeRelated.timeToMinutes(slotData.endTime);
    let startTimeInMintues = startTimeObj.totalMinutes;
    const endTimeInMinutes = endTimeObj.totalMinutes;

    const slot = (endTimeInMinutes - startTimeInMintues) / 60;

    const data = [];
    for (let i = 1; i <= slot; i++) {
      const startTime = timeRelated.minutesToTime(startTimeInMintues);
      const endTime = timeRelated.minutesToTime(startTimeInMintues + 60);
      startTimeInMintues += 60;
      const newData = slotData;
      newData.startTime = startTime;
      newData.endTime = endTime;
      const result = await SlotService.createSlot(newData);
      data.push(result);
    }

    const result2 = await RoomService.haveSlotActivate(slotData.room);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Slots created successfully",
      data,
    });
  }
);

const getAvaliableSlots = catchAsync(
  async(req:Request, res:Response, next:NextFunction) => {
    const data = req.body;
    const result = await SlotService.getAvaliableSlots(data);
    
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Available slots retrieved successfully",
      data: result,
    })
  }
)

const getAllMySLot = catchAsync(
  async(req:Request, res:Response, next:NextFunction) => {
    const {id} = req.params
    const result = await SlotService.getAllMySLot(id);
    
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "All slots of your retrieved successfully",
      data: result,
    })
  }
)

export const SlotController = {
  createSlot,
  getAvaliableSlots,
  getAllMySLot,
};
