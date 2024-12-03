import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { BookingService } from "./bookings.service";
import { getUser } from "../../utils/getUser";
import { ObjectId } from "mongoose";

const createBooking = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const bookingData = req.body;
    const result = await BookingService.createBooking(bookingData);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Booking created successfully",
      data: result,
    });
  }
);

const getAllBooking = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await BookingService.getAllBooking();

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "All bookings retrieved successfully",
      data: result,
    });
  }
);

const getMyBooking = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user =await getUser(req);
    const result = await BookingService.getMyBooking(user._id);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User bookings retrieved successfully",
      data: result,
    });
  }
);

const updateBooking = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const updateData = req.body;
    const {id} = req.params;
    const result = await BookingService.updateBooking(id, updateData);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Booking updated successfully",
      data: result,
    });
  }
);

const deleteBooking = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;
    const result = await BookingService.deleteBooking(id);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Booking deleted successfully",
      data: result,
    });
  }
);

export const BookingController = {
  createBooking,
  getAllBooking,
  getMyBooking,
  updateBooking,
  deleteBooking,
};
