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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartnerController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const partner_service_1 = require("./partner.service");
const getUser_1 = require("../../utils/getUser");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const requestedPartner = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const partnerData = req.body;
    const user = yield (0, getUser_1.getUser)(req);
    partnerData.user = user._id;
    if (partnerData.termsAgreed === false) {
        throw new AppError_1.default(404, "Terms and conditions must be agree");
    }
    const result = yield partner_service_1.PartnerService.requestedPartner(partnerData);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Partner requested successfully",
        data: result,
    });
}));
const decisionMakePartner = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const partnerData = req.body;
    const result = yield partner_service_1.PartnerService.decisionMakePartner(partnerData, req.query);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: `Partner request updated successfully`,
        data: result,
    });
}));
const getAllPartners = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield partner_service_1.PartnerService.getAllPartners(req.query);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: `Partners retrived successfully`,
        meta: result.meta,
        data: result.result,
    });
}));
const getSinglePatnerRequest = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, getUser_1.getUser)(req);
    const result = yield partner_service_1.PartnerService.getSinglePatnerRequest(user._id);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: `Single partners latest request retrived`,
        data: result,
    });
}));
exports.PartnerController = {
    requestedPartner,
    decisionMakePartner,
    getAllPartners,
    getSinglePatnerRequest,
};
