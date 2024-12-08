import { QueryBuilder } from "../../builder/QueryBuilder";
import { USER_ROLE } from "../user/user.constant";
import { User } from "../user/user.model";
import { TPartnerSchema } from "./partner.interface";
import { Partner } from "./partner.model";

const requestedPartner = async (payload: TPartnerSchema) => {
  const result = await Partner.create(payload);

  return result;
};

const decisionMakePartner = async (
  partnerData: { user: string; requestedId: string },
  payload: Record<string, unknown>
) => {
  let result;

  if (payload.operation === "Approved") {
    result = await User.updateOne(
      { _id: partnerData.user },
      { role: USER_ROLE.PARTNER }
    );

    const updated = await Partner.updateOne(
      { _id: partnerData.requestedId },
      { isApproved: "Approved" }
    );
  } else if (payload.operation === "Rejected") {
    result = await Partner.updateOne(
      { _id: partnerData.requestedId },
      { isApproved: "Rejected" }
    );
    const updated = await User.updateOne(
      { _id: partnerData.user },
      { role: USER_ROLE.CUSTOMER }
    );
  }

  return result;
};

const getAllPartners = async (payload: Record<string, unknown>) => {
  let result;
  let meta;
  if (payload.isApproved === "Approved") {
    const partnerQuery = new QueryBuilder(
      Partner.find({ isApproved: payload.isApproved }).populate("user"),
      payload
    ).pagination();
    result = await partnerQuery.modelQuery;
    meta = await partnerQuery.countTotal();
  } else if (payload.isApproved === "Rejected") {
    const partnerQuery = new QueryBuilder(
      Partner.find({ isApproved: payload.isApproved }).populate("user"),
      payload
    ).pagination();
    result = await partnerQuery.modelQuery;
    meta = await partnerQuery.countTotal();
  } else if (payload.isApproved === "Pending") {
    const partnerQuery = new QueryBuilder(
      Partner.find({ isApproved: payload.isApproved }).populate("user"),
      payload
    ).pagination();
    result = await partnerQuery.modelQuery;
    meta = await partnerQuery.countTotal();
  }

  return {
    meta,
    result,
  };
};

const getSinglePatnerRequest = async (userId: string) => {
  const result = await Partner.findOne({ user: userId })
    .sort({ createdAt: -1 }) 
    .exec();

  return result;
};

export const PartnerService = {
  requestedPartner,
  decisionMakePartner,
  getAllPartners,
  getSinglePatnerRequest,
};
