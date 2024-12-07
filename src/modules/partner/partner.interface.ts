import { Schema } from "mongoose";
import { ID_TYPE, PARTNER_STATUS } from "./partner.constant";

export type TPartnerSchema = {
  user?: Schema.Types.ObjectId;
  businessName: string;
  businessAddress: string;
  taxIdentificationNumber: string;
  bankDetails: {
    accountNumber: string;
    bankName: string;
  };
  identification: {
    idType: keyof typeof ID_TYPE;
    idNumber: string;
  };
  isApproved: "Pending" | "Approved" | "Rejected";
  termsAgreed: boolean;
  createdAt?: Date;
};
