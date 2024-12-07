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

  if (payload.operation === "approved") {
    result = await User.updateOne(
      { _id: partnerData.user },
      { role: USER_ROLE.PARTNER }
    );

    const updated = await Partner.updateOne(
      { _id: partnerData.requestedId },
      { isApproved: "Approved" }
    );
  } else if (payload.operation === "rejected") {
    result = await Partner.updateOne(
      { _id: partnerData.requestedId },
      { isApproved: "Rejected" }
    );
  }

  return result;
};

export const PartnerService = {
  requestedPartner,
  decisionMakePartner,
};
