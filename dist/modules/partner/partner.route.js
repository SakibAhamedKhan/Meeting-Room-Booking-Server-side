"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartnerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constant_1 = require("../user/user.constant");
const partner_controller_1 = require("./partner.controller");
const router = express_1.default.Router();
router.get("/", (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN), partner_controller_1.PartnerController.getAllPartners);
router.get("/requested", (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN, user_constant_1.USER_ROLE.CUSTOMER), partner_controller_1.PartnerController.getSinglePatnerRequest);
router.post("/requested", 
// auth(USER_ROLE.PARTNER),
partner_controller_1.PartnerController.requestedPartner);
router.patch("/decisionmake", (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN), partner_controller_1.PartnerController.decisionMakePartner);
exports.PartnerRoutes = router;
