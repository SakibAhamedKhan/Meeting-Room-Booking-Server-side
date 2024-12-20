"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartnerService = void 0;
const QueryBuilder_1 = require("../../builder/QueryBuilder");
const user_constant_1 = require("../user/user.constant");
const user_model_1 = require("../user/user.model");
const partner_model_1 = require("./partner.model");
const requestedPartner = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield partner_model_1.Partner.create(payload);
    return result;
});
const decisionMakePartner = (partnerData, payload) => __awaiter(void 0, void 0, void 0, function* () {
    let result;
    if (payload.operation === "Approved") {
        result = yield user_model_1.User.updateOne({ _id: partnerData.user }, { role: user_constant_1.USER_ROLE.PARTNER });
        const updated = yield partner_model_1.Partner.updateOne({ _id: partnerData.requestedId }, { isApproved: "Approved" });
    }
    else if (payload.operation === "Rejected") {
        result = yield partner_model_1.Partner.updateOne({ _id: partnerData.requestedId }, { isApproved: "Rejected" });
        const updated = yield user_model_1.User.updateOne({ _id: partnerData.user }, { role: user_constant_1.USER_ROLE.CUSTOMER });
    }
    return result;
});
const getAllPartners = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    let result;
    let meta;
    if (payload.isApproved === "Approved") {
        const partnerQuery = new QueryBuilder_1.QueryBuilder(partner_model_1.Partner.find({ isApproved: payload.isApproved }).populate("user"), payload).pagination();
        result = yield partnerQuery.modelQuery;
        meta = yield partnerQuery.countTotal();
    }
    else if (payload.isApproved === "Rejected") {
        const partnerQuery = new QueryBuilder_1.QueryBuilder(partner_model_1.Partner.find({ isApproved: payload.isApproved }).populate("user"), payload).pagination();
        result = yield partnerQuery.modelQuery;
        meta = yield partnerQuery.countTotal();
    }
    else if (payload.isApproved === "Pending") {
        const partnerQuery = new QueryBuilder_1.QueryBuilder(partner_model_1.Partner.find({ isApproved: payload.isApproved }).populate("user"), payload).pagination();
        result = yield partnerQuery.modelQuery;
        meta = yield partnerQuery.countTotal();
    }
    return {
        meta,
        result,
    };
});
const getSinglePatnerRequest = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield partner_model_1.Partner.findOne({ user: userId })
        .sort({ createdAt: -1 })
        .exec();
    return result;
});
exports.PartnerService = {
    requestedPartner,
    decisionMakePartner,
    getAllPartners,
    getSinglePatnerRequest,
};
