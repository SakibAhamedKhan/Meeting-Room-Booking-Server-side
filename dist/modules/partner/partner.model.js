"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Partner = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
const partner_constant_1 = require("./partner.constant");
const partnerSchema = new mongoose_2.Schema({
    user: {
        type: mongoose_2.Schema.Types.ObjectId,
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
            enum: Object.keys(partner_constant_1.ID_TYPE),
        },
        idNumber: { type: String, required: [true, "idNumber id is required"] },
    },
    termsAgreed: {
        type: Boolean,
        required: [true, "termsAgreed id is required"],
    },
    isApproved: {
        type: String,
        enum: partner_constant_1.PARTNER_STATUS,
        default: "Pending",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
exports.Partner = (0, mongoose_1.model)("Partner", partnerSchema);
