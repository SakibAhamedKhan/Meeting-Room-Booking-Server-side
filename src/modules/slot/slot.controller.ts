import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { timeRelated } from "../../utils/timeRelated";
import { SlotService } from "./slot.service";

const createSlot = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const slotData = req.body;
    const startTimeObj = timeRelated.timeToMinutes(slotData.startTime);
    const endTimeObj = timeRelated.timeToMinutes(slotData.endTime);
    let startTimeInMintues = startTimeObj.totalMinutes;
    let endTimeInMinutes = endTimeObj.totalMinutes;

    let slot = (endTimeInMinutes - startTimeInMintues) / 60;

    let data = [];
    for (let i = 1; i <= slot; i++) {
      const startTime = timeRelated.minutesToTime(startTimeInMintues);
      const endTime = timeRelated.minutesToTime(startTimeInMintues + 60);
      startTimeInMintues += 60;
      let newData = slotData;
      newData.startTime = startTime;
      newData.endTime = endTime;
      const result = await SlotService.createSlot(newData);
      data.push(result);
    }

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
    const result = await SlotService.getAvaliableSlots(req.query);
    
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Available slots retrieved successfully",
      data: result,
    })
  }
)

export const SlotController = {
  createSlot,
  getAvaliableSlots,
};
