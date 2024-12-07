import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { PartnerService } from "./partner.service";

const requestedPartner = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const partnerData = req.body;
    const result = await PartnerService.requestedPartner(partnerData);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Partner requested successfully",
      data: result,
    });
  }
);

const decisionMakePartner = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const partnerData = req.body;
    const result = await PartnerService.decisionMakePartner(partnerData, req.query);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: `Partner request updated successfully`,
      data: result,
    });
  }
);

const getAllPartners = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await PartnerService.getAllPartners(req.query);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: `Partners retrived successfully`,
      data: result,
    });
  }
);

export const PartnerController = {
  requestedPartner,
  decisionMakePartner,
  getAllPartners,
};
