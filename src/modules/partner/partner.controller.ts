import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { PartnerService } from "./partner.service";
import { getUser } from "../../utils/getUser";
import AppError from "../../errors/AppError";

const requestedPartner = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let partnerData = req.body;
    const user = await getUser(req);
    partnerData.user = user._id;
    if (partnerData.termsAgreed === false) {
      throw new AppError(404, "Terms and conditions must be agree");
    }

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
    const result = await PartnerService.decisionMakePartner(
      partnerData,
      req.query
    );

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
      meta: result.meta,
      data: result.result,
    });
  }
);

const getSinglePatnerRequest = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await getUser(req);
    const result = await PartnerService.getSinglePatnerRequest(user._id);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: `Single partners latest request retrived`,
      data: result,
    });
  }
);

export const PartnerController = {
  requestedPartner,
  decisionMakePartner,
  getAllPartners,
  getSinglePatnerRequest,
};
