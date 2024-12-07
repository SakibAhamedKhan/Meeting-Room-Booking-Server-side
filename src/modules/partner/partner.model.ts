import mongoose, { model } from "mongoose";
import { Schema } from "mongoose";
import { ID_TYPE, PARTNER_STATUS } from "./partner.constant";
import { TPartnerSchema } from "./partner.interface";

const partnerSchema = new Schema<TPartnerSchema>({
  user: {
    type: Schema.Types.ObjectId,
    require: [true, "user id is required"],
    ref: "User",
  },
  businessName: {
    type: String,
    require: [true, "businessName id is required"],
    trim: true,
  },
  businessAddress: {
    type: String,
    require: [true, "businessAddress id is required"],
    trim: true,
  },
  taxIdentificationNumber: {
    type: String,
    require: [true, "taxIdentificationNumber id is required"],
    trim: true,
  },
  bankDetails: {
    accountNumber: {
      type: String,
      required: [true, "accountNumber id is required"],
    },
    bankName: { type: String, required: [true, "bankName id is required"] },
  },
  identification: {
    idType: {
      type: String,
      required: [true, "idType id is required"],
      enum: Object.keys(ID_TYPE),
    },
    idNumber: { type: String, required: [true, "idNumber id is required"] },
  },
 
  termsAgreed: {
    type: Boolean,
    required: [true, "termsAgreed id is required"],
  },
  isApproved: {
    type: String,
    enum: PARTNER_STATUS,
    default: "Pending",
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
  
});


export const Partner = model<TPartnerSchema>("Partner", partnerSchema);