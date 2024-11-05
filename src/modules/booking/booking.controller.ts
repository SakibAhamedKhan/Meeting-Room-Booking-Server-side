import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { BookingService } from "./bookings.service";


const createBooking = catchAsync(
    async (req:Request, res:Response, next:NextFunction) => {
        const bookingData = req.body;
        const result = await BookingService.createBooking(bookingData);

        res.status(200).json({
            success: true, 
            statusCode: 200, 
            message: "Booking created successfully",
            data: result,
        })
    }
)

export const BookingController = {
    createBooking,
}